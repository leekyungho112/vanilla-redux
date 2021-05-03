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
