const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector('Footer');
const copyright = document.createElement('p');
copyright.innerHTML = '&copy; ' + thisYear + ' Katherine Apuzzo';
footer.appendChild(copyright);

document.body.appendChild(footer);

const skills = ["Javascript", "HTML", "CSS", "GitHub", "VS Code", "Adobe Lightroom", "Communication", "Problem Solving", "Workflow Optimization", "Critical Thinking", "Creativity", "Leadership", "Public Speaking", "Customer Service", "Sales", "Marketing", "Social Media", "Content Creation", "Photography", "Management", "Design", "Composition"];
const skillsList = document.querySelector('#Skills ul');
for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement('li');
  skill.innerHTML = skills[i];
  skillsList.appendChild(skill);
}
skillsList.style.display = 'flex';
skillsList.style.flexWrap = 'wrap';
skillsList.style.justifyContent = 'center';
skillsList.style.alignItems = 'center';
skillsList.style.listStyle = 'none';
skillsList.style.padding = '1em';
skillsList.style.width = '90%';
skillsList.style.margin = 'auto';