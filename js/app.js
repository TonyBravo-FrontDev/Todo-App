const inputTask = document.querySelector("#form-text");
const addButon = document.querySelector("#button-add");
const elementFather = document.querySelector(".container-tasks");

document.addEventListener("DOMContentLoaded", traerTareas);
addButon.addEventListener("click", agregarTarea);
elementFather.addEventListener("click", eliminarTarea);

function agregarTarea(e) {
  e.preventDefault();

  if (inputTask.value.trim() === "") {
    return inputTask.classList.toggle("animation");
  } else {
    const element = document.createElement("div");
    element.innerHTML = `
    <div class="tasks">
      <div class="column-one">
      <button class="check-box"></button>
      <p class="title-project">${inputTask.value}</p>
      </div>

      <button class="button-trash" name="delete">
          <ion-icon name="trash-outline" class="trash"></ion-icon>
      </button>
    </div>
  `;
    guardarTarea(inputTask.value);

    elementFather.appendChild(element);

    inputTask.value = "";
  }
}

// Eliminar Tarea
function eliminarTarea(e) {
  let item = e.target;

  // Eliminar Contenedor Tarea
  if (item.classList[0] === "trash") {
    let todo = item.parentElement.parentElement.parentElement;

    eliminarLocalStorage(todo);
    todo.remove();
  }

  // Cambiar estado de tarea

  if (item.classList[0] === "check-box") {
    let button = item;
    let parent = item.parentElement;

    button.classList.toggle("complete");
    parent.classList.toggle("active");

  }
}

function guardarTarea(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function traerTareas() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    const element = document.createElement("div");
    element.innerHTML = `
    <div class="tasks">
      <div class="column-one">
      <button class="check-box"></button>
      <p class="title-project">${todo}</p>
      </div>

      <button class="button-trash" name="delete">
          <ion-icon name="trash-outline" class="trash"></ion-icon>
      </button>
    </div>
  `;

    elementFather.appendChild(element);
  });
}

function eliminarLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const tareaIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(tareaIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
