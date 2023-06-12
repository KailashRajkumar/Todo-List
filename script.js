const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUl = document.getElementById("todos");

form.addEventListener("submit", (e) => {
// it prevents the default behaviour of the form submit event
  e.preventDefault();
  addTodo();
});

function addTodo() {
  let todoText = input.value;
  if (todoText) {
    const todoEl = document.createElement("li");
    todoEl.innerText = todoText;
    
    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle("completed");
      updateLS();
    });

    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });

    todosUl.appendChild(todoEl);
    input.value = '';
    updateLS();
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll("li");
  const todos = [];
  todosEl.forEach(todo => {
    todos.push({
      text: todo.innerText,
      completed: todo.classList.contains("completed")
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

window.addEventListener('DOMContentLoaded', () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos) {
    todos.forEach(todo => {
      addTodoFromLS(todo);
    });
  }
});

function addTodoFromLS(todo) {
  const todoEl = document.createElement("li");
  todoEl.innerText = todo.text;
  
  if (todo.completed) {
    todoEl.classList.add("completed");
  }

  todoEl.addEventListener('click', () => {
    todoEl.classList.toggle("completed");
    updateLS();
  });

  todoEl.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    todoEl.remove();
    updateLS();
  });

  todosUl.appendChild(todoEl);
}
