const btnNewTask = document.querySelector(".btn__new-task");
const btnCancelTask = document.querySelector(".btn__cancel-task");
const btnAddTask = document.querySelector(".btn__add-task");
const btnAllTasks = document.querySelector(".sidebar__all-tasks");
const btnInProgressTasks = document.querySelector(".sidebar__in-progress");
const btnCompletedTasks = document.querySelector(".sidebar__completed");
const darkmodeIcon = document.querySelector(".navbar__darkmode-btn-icon");
const lightmodeIcon = document.querySelector(".navbar__lightmode-btn-icon");

const activeTasks = document.querySelectorAll(".sidebar__item");

const inpContentTask = document.querySelector(".layout__content-task-inp");
const inpSearchTask = document.querySelector("#search__input");

const NoTask = document.querySelector(".no-task");
const contentTask = document.querySelector(".layout__content-task");

let gridTask = document.querySelector(".task-grid");
let taskRemainingNumber = document.querySelector(".task-remaining__number");

let taskListLocalstorage = JSON.parse(localStorage.getItem("task-list"));
let taskList = [];
let taskId = 1;
let whichTask = "all";

if (taskListLocalstorage) {
  taskList = taskListLocalstorage;
  taskId = Math.max(...taskList.map((t) => t.id)) + 1;
  RenderTask();
}

if (taskList.length !== 0) {
  NoTask.classList.add("hidden");
}

SetActiveTask(0);

btnNewTask.addEventListener("click", () => NewTask());
btnCancelTask.addEventListener("click", () => CancelTask());
btnAddTask.addEventListener("click", () => AddTask());

inpContentTask.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    AddTask();
  }
});
inpSearchTask.addEventListener("input", (e) => SearchTask(e));

btnAllTasks.addEventListener("click", () => {
  SetActiveTask(0);
  TaskListType("all");
});
btnInProgressTasks.addEventListener("click", () => {
  SetActiveTask(1);
  TaskListType("in-progress");
});
btnCompletedTasks.addEventListener("click", () => {
  SetActiveTask(2);
  TaskListType("completed");
});

gridTask.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".task-card__btn--delete");
  const editBtn = e.target.closest(".task-card__btn--edit");

  if (deleteBtn) {
    const deleteId = Number(deleteBtn.dataset.id);
    DeleteTask(deleteId);
  }
  if (editBtn) {
    const editId = Number(editBtn.dataset.id);
    EditTask(editId);
  }
});

gridTask.addEventListener("change", (e) => {
  if (e.target.classList.contains("task-card__checkbox")) {
    const id = Number(e.target.dataset.id);
    const task = taskList.find((t) => t.id === id);
    task.isChecked = e.target.checked;

    const cardTask = document.querySelector(`.task-card[data-id="${task.id}"]`);
    const cardTaskTitle = document.querySelector(
      `.task-card__title[data-id="${task.id}"]`
    );
    if (task.isChecked) {
      cardTask.classList.add("task-card__active");
      cardTaskTitle.classList.add("text-line-through");
    } else {
      cardTask.classList.remove("task-card__active");
      cardTaskTitle.classList.remove("text-line-through");
    }
    taskRemainingNumber.textContent = taskList.filter(
      (t) => !t.isChecked
    ).length;

    SaveTask();
  }
});

function RenderTask() {
  gridTask.innerHTML = ShowTaskList(taskList, whichTask)
    .map(
      (task) => `
      <div class="task-card ${
        task.isChecked ? "task-card__active" : ""
      }" data-id="${task.id}">
        <input 
          type="checkbox" 
          class="task-card__checkbox" 
          data-id="${task.id}" 
          ${task.isChecked ? "checked" : ""}
        />
        <span class="task-card__title ${
          task.isChecked ? "text-line-through" : ""
        }" data-id="${task.id}">${task.title}</span>
        <span class="task-card__date">${task.date}</span>
        <div class="task-card__actions">
          <button class="task-card__btn task-card__btn--edit" data-id="${
            task.id
          }">
            <i class="fas fa-edit"></i>
          </button>
          <button class="task-card__btn task-card__btn--delete" data-id="${
            task.id
          }">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>`
    )
    .join("");

  taskRemainingNumber.textContent = taskList.filter((t) => !t.isChecked).length;
  if (taskList.length !== 0) {
    NoTask.classList.add("hidden");
  } else {
    NoTask.classList.remove("hidden");
  }
  SaveTask();
}

function AddTask() {
  if (inpContentTask.value) {
    taskList.push({
      id: taskId++,
      isChecked: false,
      title: inpContentTask.value,
      date: new Date().toLocaleString(),
    });
  }

  inpContentTask.value = "";
  RenderTask();
  CancelTask();
}

function SaveTask() {
  localStorage.setItem("task-list", JSON.stringify(taskList));
}

function CancelTask() {
  contentTask.classList.add("hidden");
}

function NewTask() {
  inpContentTask.value = "";
  contentTask.classList.remove("hidden");
  inpContentTask.focus();
}

function DeleteTask(id) {
  taskList = taskList.filter((task) => task.id !== id);
  if (taskList.length !== 0) {
    NoTask.classList.add("hidden");
  } else {
    NoTask.classList.remove("hidden");
  }

  RenderTask();
}

function EditTask(id) {
  const task = taskList.find((e) => e.id === id);
  const newTitle = prompt("Edit title :", task.title);

  if (newTitle && newTitle.trim() !== "") task.title = newTitle.trim();

  RenderTask();

  const cardTask = document.querySelector(`.task-card[data-id="${task.id}"]`);
  const cardTaskTitle = document.querySelector(
    `.task-card__title[data-id="${task.id}"]`
  );
  if (task.isChecked) {
    cardTask.classList.add("task-card__active");
    cardTaskTitle.classList.add("text-line-through");
  } else {
    cardTask.classList.remove("task-card__active");
    cardTaskTitle.classList.remove("text-line-through");
  }
}

function SearchTask(inpValue) {
  const value = inpValue.target.value.toLowerCase();

  ShowTaskList(taskList, whichTask).forEach((task) => {
    const card = document.querySelector(`.task-card[data-id="${task.id}"]`);
    const isVisible =
      task.title.toLowerCase().includes(value) ||
      task.date.toLowerCase().includes(value);

    card.classList.toggle("hidden", !isVisible);
  });
}

function TaskListType(type) {
  whichTask = type;
  RenderTask();
}

function SetActiveTask(index) {
  activeTasks.forEach((item) => item.classList.remove("sidebar__item--active"));
  activeTasks[index].classList.add("sidebar__item--active");
}

function ShowTaskList(tasks, which) {
  const AllTasks = tasks;
  const inProgressTasks = tasks.filter((e) => !e.isChecked);
  const completedTasks = tasks.filter((e) => e.isChecked);

  if (which === "all") {
    return AllTasks;
  } else if (which === "in-progress") {
    return inProgressTasks;
  } else if (which === "completed") {
    return completedTasks;
  }
}

const btnDarkmode = document.querySelector(".navbar__darkmode-btn");
let darkmode = localStorage.getItem("darkmode");

if (darkmode === "active") enableDarkmode();

btnDarkmode.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});

function enableDarkmode() {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
  darkmodeIcon.classList.add("hidden");
  lightmodeIcon.classList.remove("hidden");
}
function disableDarkmode() {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
  darkmodeIcon.classList.remove("hidden");
  lightmodeIcon.classList.add("hidden");
}
