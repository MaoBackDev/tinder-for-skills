import { API_URL, getFormData, postRequest, toCapitalize } from "./helpers/index.js";
const uuid = localStorage.getItem("uuid") || false;
const modalCreate = new bootstrap.Modal('#modal-add-service');

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
  const response = await fetch(`${API_URL}/services/company`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      uuid,
    },
  });
  const data = await response.json();
  return data;
};

const getUsers = async () => {
  const response = await fetch(`${API_URL}/services/company`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      uuid,
    },
  });
  const data = await response.json();
  return data;
};

const createService = async (url, body) => {
  try {
      const response = await fetch(`${API_URL}/${url}`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          uuid
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error
    }
}

const loadServices = async() => {
  const response = await getServices();
  if(!response.ok) return response.message;

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
  const bodyTable = d.getElementById("body-table");
  const formService = d.getElementById('form-add-service')

  if(!uuid) location.href = './login.html';
  try {
    const response = await getCompany();
    const { company } = response;
    nameCompany.textContent = toCapitalize(company.name);
    bodyTable.innerHTML = await loadServices();
  } catch (error) {
    console.log(error)
  }

  const users = await getUsers();
  console.log(users)

  formService.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = getFormData(e.target);
    const response = await createService('services', formData);
    if(response.ok) {
      location.reload()
      // formService.reset();
      // modalCreate.hide();
    }
  })


})(document);