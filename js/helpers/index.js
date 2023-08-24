export const API_URL = 'http://localhost:3000/api'
// export const API_URL = 'https://api-tinder-for-skills.onrender.com/api';

export const toCapitalize = (str = '') => {
  const strArray = str.split(' ');

  for (var i = 0; i < strArray.length; i++) {
    strArray[i] = strArray[i].charAt(0).toUpperCase() + strArray[i].slice(1);
  }
  const strCapitalized = strArray.join(" ");
  return strCapitalized;
}

export const drawForm = (type) => {

  if(type === 'company') {
    return `
      <div class="mb-3">
        <input type="text" class="form-control" name="name" aria-describedby="emailHelp" placeholder="Nombre de empresa..." required>
      </div>
      <div class="mb-3">
        <input type="text" class="form-control" name="nit"  aria-describedby="emailHelp" placeholder="nit..." required>
      </div>
      <div class="mb-3">
        <input type="email" class="form-control" name="email" aria-describedby="emailHelp" placeholder="Correo Electrónico..." required>
      </div>
      <div class="mb-3">
        <input type="password" class="form-control" name="password" placeholder="Contraseña..." required>
      </div>
      <div class="mb-3">
        <input type="text" class="form-control" name="address"  aria-describedby="emailHelp" placeholder="Dirección..." required>
      </div>
      <input type="hidden" name="type" value="company">
      <div class="mb-3">
        <input type="tel" class="form-control" name="phone"  aria-describedby="emailHelp" placeholder="Teléfono..." required>
      </div>`
  }
  return `
    <div class="mb-3">
      <input type="text" class="form-control" name="first_name" aria-describedby="emailHelp" placeholder="Nombres...">
    </div>
    <div class="mb-3">
      <input type="text" class="form-control" name="last_name"  aria-describedby="emailHelp" placeholder="Apellidos...">
    </div>
    <div class="mb-3">
      <input type="email" class="form-control" name="email" aria-describedby="emailHelp" placeholder="Correo Electrónico...">
    </div>
    <div class="mb-3">
      <input type="password" class="form-control" name="password" placeholder="Contraseña...">
    </div>
    <input type="hidden" name="type" value="user">`
}

export const getFormData = (element) => {
  const data = Object.fromEntries(
    new FormData (element)
  )
  for (const property in data) {
    data[property] = data[property].toLowerCase();
  }
  return data
}

export const postRequest = async (url, body) => {
  try {
      const response = await fetch(`${API_URL}/${url}`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error
    }
}

export const postAuthRequest = async (url, body, uuid) => {
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

export const getAuthRequest = async (url, uuid) => {
  try {
      const response = await fetch(`${API_URL}/${url}`, {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          uuid
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return error
    }
}   

export const putAuthRequest = async (url, uuid, body) => {
  try {
      const response = await fetch(`${API_URL}/${url}`, {
        method: 'PUT',
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

