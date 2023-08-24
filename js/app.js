import { drawForm, getFormData, postRequest } from "./helpers/index.js";
const uuid = localStorage.getItem('uuid') ||false;

(async (d) => {
  const formLogin = d.getElementById('form-login');
  const formRegister = d.getElementById('form-register');
  const modal = new bootstrap.Modal('#modal-register');
  let type;

  d.addEventListener('click', e => {
    if(e.target.matches('#btn-company')) {
      type = 'company'
      formRegister.querySelector('.modal-body').innerHTML = drawForm(type);
    }
    if(e.target.matches('#btn-user')) {
      type = 'user'
      formRegister.querySelector('.modal-body').innerHTML = drawForm(type);
    }
  }) 

  formLogin.addEventListener('submit',  async(e) => {
    e.preventDefault();
    const formData = getFormData(e.target);
    try {
      const response = await postRequest('auth/login', formData);
      console.log(response)
      if(response.ok) {
        localStorage.setItem('uuid', response.uuid);
        formData.type === 'user' ? 
        location.href = './profile.html': 
        location.href = './company.html'
      }
    } catch (error) {
      console.log(error)
    }
  })

  formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = getFormData(e.target);
    const response = await postRequest('auth/register', formData);
    console.log(response)
    if(response.ok) {
      formRegister.reset();
      modal.hide();
    }
  })
})(document)
