'use strict';

const baseUrl = 'https://jsonplaceholder.typicode.com';

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // always throw an exception
  throw new Error('A fetch error has ocurred!');
}

async function getTodos() {
  try {
    const data = await fetch(baseUrl + '/todos?userId=1').then(handleResponse);
    displayTodos(data);
  } catch (error) {
    console.warn(error);
  }
}

getTodos();

function displayTodos(todos) {
  // avem nevoie de elementul html in care vom afisa todo-urile
  const list = document.querySelector('[data-todo-list]');
  // bagam todo-urile in elementul de mai sus
  //   pentru fiecare todo:
  //      cream un element (li-uri)
  //      dam si continutul li-ului
  //      trebuie sa facem append la list cu li-ul
  // for (let i = 0; i < todos.length; i++) {
  //   const item = todos[i];
  for (const item of todos) {
    const listItem = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox';
    // if (item.completed) {
    //   checkbox.checked = true;
    //   // label.classList.add('done');
    // }

    label.htmlFor = 'todo' + item.id;
    checkbox.id = 'todo' + item.id;

    checkbox.checked = item.completed;
    checkbox.classList.add('todo-check');
    // label.classList.add(item.completed ? 'done' : 'nothing');

    checkbox.dataset.todoId = item.id;
    checkbox.addEventListener('change', toggleCompleted);

    label.innerText = item.title;
    listItem.prepend(checkbox);
    listItem.append(label);
    list.append(listItem);
  }
}

function toggleCompleted(e) {
  const todoId = e.target.dataset.todoId;
  const todoCompleted = e.target.checked;
  // console.log(todoCompleted);
  // Destructuring assignment
  // const { todoId } = e.target.dataset;

  // Template literal: `${baseUrl}/todos/${todoId}`
  // Interpolation (puting variables inside the template literal)
  fetch(`${baseUrl}/todos/${todoId}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      completed: todoCompleted,
    }),
  })
    .then(handleResponse)
    .then(console.log);
}
