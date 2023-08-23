import { 
  getAuthRequest, 
  getFormData, 
  postAuthRequest, 
  putAuthRequest, 
  toCapitalize 
} from "./helpers/index.js";
const uuid = localStorage.getItem("uuid") || false;

const drawSkills = (array = []) => {
  let skills = array.map(skill => `<span>${toCapitalize(skill.name)}</span>`);
  skills = skills.join('');
  return skills;
}

(async (d) => {
  const formSkill = d.getElementById('form-skills');
  const formEdit = d.getElementById('form-edit');
  if (!uuid) location.href = "login.html";
  let skills = [];
  if(uuid) {
    try {
      const data = await getAuthRequest('users/profile', uuid);
      const { user } = data
      const userSkills = user.Skills;
      skills = [ ...userSkills ] 
      console.log('skills antes de agregar', skills)
      const skillsHTML = drawSkills(skills)
      d.getElementById('name-user').innerHTML = `${user.first_name} ${user.first_name}`;
      d.getElementById('profile-description').innerHTML = user.profile ? user.profile : 'Completa tu perfil'
      d.getElementById('price_service').value = user.price_service;
      d.getElementById('location').value = user.location ? user.location : 'Tu ciudad de ubicación'
      d.querySelector('.skills').innerHTML = skillsHTML ? skillsHTML : '<p>Aún no tienes habilidades</p>'

      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }
  
  formEdit.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = getFormData(e.target);

    try {
      const response = await putAuthRequest('users/update', uuid, formData);
      if(response.ok) location.href = 'profile.html';
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  })

  // add skills
  formSkill.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = getFormData (e.target);

    try {
      const response = await postAuthRequest ('users/add/skills', formData, uuid);
      if(response.ok){
        const skill = response.skill;
        console.log(skill)
        d.getElementById('input-skill').value = '';
        skills.push(skill);
        console.log('skills despues de agregar', skills)
        const newSkills = drawSkills(skills);
        d.querySelector('.skills').innerHTML = newSkills;
      }
    } catch (error) {
      console.log(error)
    }
  })
})(document)