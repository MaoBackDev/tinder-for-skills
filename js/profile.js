import { API_URL, getFormData, putAuthRequest, toCapitalize } from "./helpers/index.js";
const uuid = localStorage.getItem("uuid");


const getProfile = async () => {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      uuid,
    },
  });
  const data = await response.json();
  return data;
};

const getServices = async () => {
  const response = await fetch(`${API_URL}/services/user`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      uuid,
    },
  });
  const data = await response.json();
  return data;
};

const loadServices = async() => {
  const response = await getServices();
  if(!response.ok) return response.message;

  const { services } = response;
  if (services.length < 1) {
    return '<div class="text-center text-danger">Aun no tienes servicios</div>';
  } 
  else {
    let service = services.map((el) => `
      <tr>
        <td>${el.name}</td>
        <td>${el.duration}</td>
        <td>$ ${el.due}</td>
        <td>${el.Company.name}</td>
        <td>
          <button 
            id="btn-details" 
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

const logout = () => {
  localStorage.removeItem("uuid");
  location.reload();
}

(async (d) => {
  const titleProfile = d.getElementById("title-profile");
  const bodyTable = d.getElementById("body-table");
  let id;

  if (!uuid) location.href = "./login.html";
  try {
    const profile = await getProfile();
    if (!profile.ok) console.log(profile.message);

    const { user } = profile;
    console.log(user)
    const fullName = toCapitalize(`${user.first_name} ${user.last_name}`)
    titleProfile.textContent = fullName;

    bodyTable.innerHTML = await loadServices();
  } catch (error) {
    console.log(error)
  }

  // show service detail
  d.addEventListener('click', async (e) => {
    if(e.target.matches('#logout')) logout();

    if(e.target.matches('#btn-details')) {
      id = e.target.dataset.id;

      const response = await fetch(`${API_URL}/services/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          uuid,
        },
      });
      const jsonResponse = await response.json();
      if(!jsonResponse.ok) console.log(jsonResponse.message);

      const { service } = jsonResponse;

      d.querySelector('.modal-title').innerHTML = toCapitalize(service.Company.name);
      d.querySelector('.modal-body h2').innerHTML = toCapitalize(service.name);
      d.querySelector('.modal-body p').innerHTML = toCapitalize(service.description);
      console.log(service)
    }
  })

  d.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(e.target.matches('#accept')) {
      const url = `services/accept/service/${id}`;
      const data = getFormData(e.target);
      const response = await putAuthRequest(url, uuid, data);
      if(response.ok) location.reload();
      console.log(response)
    }

    if(e.target.matches('#decline')) {
      const url = `services/decline/service/${id}`;
      const data = getFormData(e.target);
      const response = await putAuthRequest(url, uuid, data);
      if(response.ok) location.reload();
    }
  })
})(document)
