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

const messageForm = document.querySelector("[name='leave_message']");
const messageSection = document.querySelector('#messages');
const messageList = messageSection.querySelector('ul');
messageSection.hidden = true;

let idCounter = 0;

function makeId() {
  return 'message-' + idCounter++;
}

const entryById = {};

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = event.target.usersName.value;
  const email = event.target.usersEmail.value;
  const message = event.target.usersMessage.value;

  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);

  const uid = makeId();
  const newMessage = document.createElement('li');
  newMessage.classList.add('message-item');
  
  console.log('ID:', uid);

  newMessage.innerHTML = `
    <a href="mailto:${email}" >${name} </a>
    <span>wrote: ${message} </span> `;
  newMessage.setAttribute('id', uid);

  entryById[uid] = {
    usersName: name,
    usersEmail: email,
    usersMessage: message,
  };
  newMessage.appendChild(makeEditButton());
  newMessage.appendChild(makeRemoveButton());

  const messageSection = document.querySelector('#messages');
  const messageList = messageSection.querySelector('ul');

  messageList.appendChild(newMessage);
  messageForm.reset();
  messageSection.hidden = false;
});

function makeRemoveButton() {
  const removeButton = document.createElement('button');
  removeButton.innerText = 'remove';
  removeButton.type = 'button';
  removeButton.className = 'remove-button';
  removeButton.addEventListener('click', (event) => {
    const entry = removeButton.parentNode;
    let uid1 = entry.getAttribute('id');
    delete entryById[uid1];
    entry.remove();

    if (messageList.childElementCount === 0) {
      messageSection.hidden = true;
    }
  });

  return removeButton;
};

function makeEditButton() {
  const editButton = document.createElement('button');
  editButton.innerText = 'edit';
  editButton.type = 'button';
  editButton.className = 'edit-button';
  editButton.addEventListener('click', (event) => {
    const entry = editButton.parentNode;
    const oldRemoveButton = entry.querySelector('button.remove-button');
    oldRemoveButton.hidden = true;

    let uid2 = entry.getAttribute('id');
    let clonedForm = messageForm.cloneNode(true);
    const entryData = entryById[uid2];
    clonedForm.className = 'edit-message-form';
    clonedForm.usersName.value = entryData.usersName;
    clonedForm.usersEmail.value = entryData.usersEmail;
    clonedForm.usersMessage.value = entryData.usersMessage;
    entry.appendChild(clonedForm);
    clonedForm.addEventListener('submit', (event) => {
      event.preventDefault();
      entryData.usersName = event.target.usersName.value;
      entryData.usersEmail = event.target.usersEmail.value;
      entryData.usersMessage = event.target.usersMessage.value;
      let newEntry = document.createElement('li');
      newEntry.classList.add('message-item');
      newEntry.setAttribute('id', uid2);
      newEntry.innerHTML = ` <a href="mailto:${entryData.usersEmail}">${entryData.usersName}</a> <span>wrote: ${entryData.usersMessage}</span> `;
      newEntry.appendChild(makeEditButton());
      newEntry.appendChild(makeRemoveButton());
      entry.parentNode.replaceChild(newEntry, entry);
    });
  });

  return editButton;
}

const userName = 'kpzo';
fetch(`https://api.github.com/users/${userName}/repos`)
  .then((response) => {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error('Failed to fetch respositories');
    }
  })
  .then((data) => {
    const repositories = JSON.parse(data);
    console.log(repositories);

    const projectSection = document.querySelector('#Projects');

    let projectList = document.createElement('ul');
    projectSection.appendChild(projectList);

    for (let repository of repositories) {
      let project = document.createElement('li');
      project.innerText = repository.name;
      projectList.appendChild(project);
    }
  })
  .catch(error => {
    if (error instanceof SyntaxError) {
      console.log('Unparsable response from server');
    } else {
    console.log('Error fetching data:', error);
    }
  });