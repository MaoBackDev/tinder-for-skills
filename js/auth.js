// import { drawForm, getFormData, postRequest } from "./helpers/index.js";

// export const auth = () => {
//   const d = document;
//   const formLogin = d.getElementById('form-login');
//   const formRegister = d.getElementById('form-register');
//   const modal = new bootstrap.Modal('#modal-register');
//   let type;


//   d.addEventListener('click', e => {
//     if(e.target.matches('#btn-company')) {
//       type = 'company'
//       formRegister.querySelector('.modal-body').innerHTML = drawForm(type);
//     }
//     if(e.target.matches('#btn-user')) {
//       type = 'user'
//       formRegister.querySelector('.modal-body').innerHTML = drawForm(type);
//     }
//   }) 

//   formLogin.addEventListener('submit',  async(e) => {
//     e.preventDefault();
//     const formData = getFormData(e.target);
//     const response = await postRequest('auth/login', formData);
//     if(!response.ok) return console.log(response.message);
  
//     const uuid = response.uuid;
//     localStorage.setItem('uuid', uuid);
//     formData.type === 'user' ? 
//       (location.href = 'profile.html') : 
//       (location.href = 'company.html')
//   })

//   formRegister.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const formData = getFormData(e.target);
//     const response = await postRequest('auth/register', formData);
//     if(response.ok) {
//       formRegister.reset();
//       modal.hide();
//     }
//   })
// }
