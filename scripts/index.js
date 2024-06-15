const addBtn = document.querySelector(".btn-add");
const inputTxt = document.querySelector("input");
const completedBtns = document.querySelector(".btn-completed");
const taskslist = document.querySelector("ul");

const completedTask = (label, li) => {
  const localTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskIndex = localTasks.indexOf(label.textContent);
  if (taskIndex != -1) {
    localTasks.splice(taskIndex, 1);
    localStorage.tasks = JSON.stringify(localTasks);
  }
  label.style.textDecoration = "line-through";
  label.style.color = "lightgray";
  setTimeout(() => {
    li.remove();
    if (localTasks.length === 1) {
      const hr = document.querySelector("hr");
      hr.remove();
    }
  }, 1000);
};

const addTask = (task) => {
  if (task === "" || task.trim() === "") {
    return false;
  }
  taskslist.style.display = "block";
  const localTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskLi = document.createElement("li");
  const taskDiv = document.createElement("div");
  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  const taskLable = document.createElement("label");
  taskLable.innerText = task;
  taskDiv.appendChild(taskCheckbox);
  taskDiv.appendChild(taskLable);
  if (localTasks.length > 0 && taskslist.lastElementChild) {
    const prevTaskDiv = taskslist.lastElementChild.querySelector("div");
    prevTaskDiv.appendChild(document.createElement("hr"));
  }
  taskDiv.className = "task";
  taskLi.appendChild(taskDiv);
  taskslist.appendChild(taskLi);
  taskCheckbox.addEventListener("change", (e) => {
    if (e.target.checked) completedTask(taskLable, taskLi);
  });
  return true;
};

addBtn.addEventListener("click", () => {
  if (!addTask(inputTxt.value)) {
    inputTxt.value = "";
    return;
  }
  // update the local storage
  localStorage.setItem(
    "tasks",
    JSON.stringify(
      JSON.parse(localStorage.getItem("tasks") || "[]").concat(inputTxt.value)
    )
  );
  inputTxt.value = "";
});

window.addEventListener("load", () => {
  if (
    localStorage.getItem("tasks") &&
    JSON.parse(localStorage.getItem("tasks")).length > 0
  ) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach((task) => {
      addTask(task);
    });
  } else {
    taskslist.style.display = "none";
  }
});
