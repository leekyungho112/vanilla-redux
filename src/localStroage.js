import React from 'react';

export const loadState = () => {
  try {
    const loadedTodo = localStorage.getItem('state');
    if (loadedTodo === null) {
      return;
    }
    return JSON.parse(loadedTodo);
  } catch (error) {
    return console.log(error);
  }
};

export const saveState = (state) => {
  try {
    const saveTodo = JSON.stringify(state);
    localStorage.setItem('state', saveTodo);
  } catch (error) {}
};
