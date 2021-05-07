import React, { useState } from 'react';
import { connect } from 'react-redux';
import ToDo from '../components/ToDo';

import { actionCreators } from '../store';

function Home({ toDos, addToDo, saveToDo }) {
  console.log(toDos);

  const [text, setText] = useState('');
  function onChange(e) {
    setText(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    addToDo(text);

    setText('');
  }

  return (
    <>
      <h1>To DO</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="write to do"
          value={text}
          onChange={onChange}
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
}

function mapStateToProps(state) {
  return {
    toDos: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToDo: (text) => dispatch(actionCreators.addToDo(text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
