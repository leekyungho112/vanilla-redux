# Vanilla - Redux

### Learning Vanilla-Redux and React-Redux

#### vanilla-Count

```js
const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

let count = 0;

const updateNumber = () => {
  number.innerText = count;
};
const handleAdd = () => {
  count = count + 1;
  console.log(count);
  updateNumber();
};
const handleMinus = () => {
  count = count - 1;
  console.log(count);
  updateNumber();
};
add.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);
```

#### vanilla-Redux-Count

```js
import { createStore } from 'redux';

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

number.innerText = 0;
const ADD = 'add';
const MINUS = 'minus';

const countModify = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModify);

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);
add.addEventListener('click', () => countStore.dispatch({ type: ADD }));
minus.addEventListener('click', () => countStore.dispatch({ type: MINUS }));
```

#### vanilla-ToDoList

```js
const todoForm = document.querySelector('.todo__form');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.todo__list');

const paintTodo = (todo) => {
  const li = document.createElement('li');
  li.innerText = todo;
  todoList.appendChild(li);
};

const handleSubmit = (e) => {
  e.preventDefault();

  console.log(todoInput.value);
  const todo = todoInput.value;
  paintTodo(todo);
  todoInput.value = '';
};

function init() {
  todoForm.addEventListener('submit', handleSubmit);
}

init();
```

#### Vanilla-ToDos-Redux

```js
import { createStore } from 'redux';

const todoForm = document.querySelector('.todo__form');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.todo__list');

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

const addTodo = (text, id) => {
  return {
    type: ADD_TODO,
    id,
    text,
  };
};

const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ id: action.id, text: action.text }, ...state];
    case DELETE_TODO:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);
store.subscribe(() => {
  console.log(store.getState());
});

const paintTodos = () => {
  const todos = store.getState();
  todoList.innerHTML = '';
  todos.forEach((todo) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    li.id = todo.id;
    li.innerText = todo.text;
    btn.innerText = '❌';
    btn.addEventListener('click', dispatchDeleteToDo);
    li.appendChild(btn);
    todoList.appendChild(li);
  });
};

store.subscribe(paintTodos);

const dispatchAddToDo = (text, id) => {
  store.dispatch(addTodo(text, id));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteTodo(id));
};

const handleSubmit = (e) => {
  e.preventDefault();
  const todo = todoInput.value;
  const id = Date.now();
  todoInput.value = '';
  dispatchAddToDo(todo, id);
};

function init() {
  todoForm.addEventListener('submit', handleSubmit);
}

init();
```
