import { API_URL, getAuthRequest, getFormData, postAuthRequest, toCapitalize } from "./helpers/index.js";
const uuid = localStorage.getItem("uuid") || false;


const getCompany = async () => {
  const response = await fetch(`${API_URL}/company`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      uuid,
    },
  });
  const data = await response.json();
  return data;
}

const getServices = async () => {
  const response = await fetch(`${API_URL}/services/unssigned`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      uuid,
    },
  });
  const data = await response.json();
  return data;
};

const loadUsers = async(skill) => {
  const url = `users?skill=${skill}`;
  const response = await getAuthRequest(url, uuid);
  if(response.ok) {
    const{ users } = response;
    
    if (users.length < 1) {
      return '<p class="text-center text-danger">No se encontraron talentos disponibles</p>';
    } 
    
    let results = users.map( (user) => `
    <div class="card p-3 d-flex flex-column gap-3" style="width: 300px;">
    <div class="d-flex align-items-center gap-3 justify-content-between">
      <img src="./assets/images/avatar.png" class="img-thumbnail rounded-circle" width="40">
      <p>${user.first_name} ${user.last_name}</p>
    </div>
    <div>
      <div>
        <small>perfil</small>
        <p>${user.profile}</p>
      </div>
      <div>
        <small>Valor servicio</small> <span>$${user.price_service}</span>
        <br>
        <small>Ubicación</small> <span>${user.location}</span>
        <br>
        <small>calificación</small> <span>5</span>
      </div>
      <div>
        <button 
          id="btn-assign"   
          class="btn btn-info" 
          data-bs-toggle="modal" 
          data-bs-target="#modal-add-service"
          data-id="${user.id}" 
        >
          Asignar servicio
        </button>
      </div>
    </div>
  </div>
    `) 
    results = results.join('');
    return results;
  }

  const { services } = response;
  if (services.length < 1) {
    return '<p class="text-center text-danger w-100">Aún no tienes servicios</p>';
  } 
  else {
    let service = services.map((el) => `
      <tr>
        <td>${el.name}</td>
        <td>${el.duration}</td>
        <td>$ ${el.due}</td>
        <td>${el.status}</td>
        <td>${!el.User?'Sin asignar':toCapitalize(el.User.first_name + ' ' + el.User.last_name)}</td>
        <td>
          <button 
            id="btn-details" 
            class="btn btn-sm btn-info"
            data-id="${el.id}" 
            data-bs-toggle="modal" 
            data-bs-target="#modalService"
          >
            Ver
          </button>
        </td>
      </tr>`
    );
    service = service.join("");
    return service;
  }
}

( async (d) => {
  const nameCompany = d.getElementById("name-company");
  const searcher = d.getElementById('search');
  const formService = d.getElementById('form-add-service')
  let userID;
  let services;
  if(!uuid) location.href = './login.html';

  try {
    const response = await getCompany();
    services = await getServices();
    const { company } = response;
    nameCompany.textContent = toCapitalize(company.name);
  } catch (error) {
    console.log(error)
  }

  searcher.addEventListener('submit', async (e) => {
    e.preventDefault();
    const skill = e.target.skill.value;

    const usersHTML = await loadUsers(skill);
    d.getElementById('user-results').innerHTML = usersHTML;
  })

  d.addEventListener('click', e => {
    if(e.target.matches('#btn-assign')) {
      userID = e.target.dataset.id;
      let options = '<option selected>Selecciona el servicio...</option>';
      let service = services.services.map(service => `<option value="${service.id}">${service.name}</option>`)
      service = service.join('')
      options += service;
      d.querySelector('.form-select').innerHTML = options;
    }
  })

  formService.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = `services/add/user/${userID}`
    const data = getFormData(e.target);
    const response = await postAuthRequest(url, data, uuid)
    if(response.ok) location.reload()    
  })
})(document);