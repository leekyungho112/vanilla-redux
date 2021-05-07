import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

function Detail({ toDo, onBtnClick }) {
  console.log(toDo);
  return (
    <div>
      <h1>{toDo?.text}</h1>
      <h3>Create at: {toDo?.id}</h3>
      <button onClick={onBtnClick}>DEL</button>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  const {
    match: {
      params: { id },
    },
  } = ownProps;

  return { toDo: state.find((todo) => todo.id === parseInt(id)) };
}

function mapDispatchToProps(dispatch, ownProps) {
  const {
    match: {
      params: { id },
    },
  } = ownProps;
  return {
    onBtnClick: () => dispatch(actionCreators.deleteToDo(parseInt(id))),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
