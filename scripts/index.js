const addBtn = document.querySelector('.btn-add');
const inputTxt = document.querySelector('input');
const completedBtns = document.querySelector('.btn-completed');
const tasklist = document.querySelector('ul');

const addTask = (task) => {
  if (task.name === '') {
    return;
  }
  tasklist.style.display = 'block';
  const taskLi = document.createElement('li');
  const taskDiv = document.createElement('div');
  taskDiv.innerHTML = `
    <label for="btn-completed">${task.name}</label>
    <button class="btn-completed">Completed</button>
    <button class="btn-delete">Delete</button>
  `
  taskDiv.className = 'task';
  taskLi.appendChild(taskDiv);
  tasklist.appendChild(taskLi);
  const localTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  localTasks.push(task);
}

const completedTask = (task) => {
  task.style.textDecoration = 'line-through';
  task.style.color = 'lightgray';
}

addBtn.addEventListener('click', () => {
  const task = {
    name: inputTxt.value,
    completed: false
  };
  addTask(task);
  // update the local storage
  localStorage.setItem('tasks', JSON.stringify(JSON.parse(localStorage.getItem('tasks') || '[]').concat(task)));
  inputTxt.value = '';
});

tasklist.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-completed')) {
    completedTask(e.target.previousElementSibling);
    const localTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // get the index of the task to be marked as completed
    const taskIndex = Array.from(
      e.target.parentElement.parentElement.parentElement.children
    ).indexOf(
      e.target.parentElement.parentElement
    );
    // mark the task as completed
    localTasks[taskIndex - 1].completed = true;
    // update the local storage
    localStorage.setItem('tasks', JSON.stringify(localTasks));
  }
  else if (e.target.classList.contains('btn-delete')) { 
    const localTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // get the index of the task to be deleted
    const taskIndex = Array.from(
      e.target.parentElement.parentElement.parentElement.children
    ).indexOf(
      e.target.parentElement.parentElement
    );
    // remove the task from the local storage
    localTasks.splice(taskIndex - 1, 1);
    // update the local storage
    localStorage.setItem('tasks', JSON.stringify(localTasks));
    e.target.parentElement.parentElement.remove();
    if (tasklist.children.length === 1) {
      tasklist.style.display = 'none';
    }
  }
});

window.addEventListener('load', () => {
  if (localStorage.getItem('tasks') && JSON.parse(localStorage.getItem('tasks')).length > 0){
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => {
      addTask(task);
      if (task.completed) {
        // get the last task added
        const taskLable = tasklist.lastElementChild.querySelector('label');
        completedTask(taskLable);
      }
    });
  } else {
    tasklist.style.display = 'none';
  }
});
