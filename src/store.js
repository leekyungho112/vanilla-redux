import { createStore } from 'redux';
import { loadState, saveState } from './localStroage';

const ADD = 'ADD';
const DELETE = 'DELETE';

const addToDo = (text) => {
  return {
    type: ADD,
    text,
  };
};
const deleteToDo = (id) => {
  return {
    type: DELETE,
    id,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter((toDo) => toDo.id !== action.id);

    default:
      return state;
  }
};
const persistedState = loadState();

const store = createStore(reducer, persistedState);

store.subscribe(() => {
  saveState(store.getState());
});

export const actionCreators = {
  addToDo,

  deleteToDo,
};

export default store;
