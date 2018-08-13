import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { todos, visibilityFilter } from './components/Todo';
// import { runTests } from './components/Todo.test';
// runTests();

export const TodoApp = combineReducers({
  todos,
  visibilityFilter,
});

const store = createStore(TodoApp);

let nextTodoId = 0;
const { Component } = React;
class ToDoApp extends Component {
  render () {
    return (
      <div>
        <input ref={node => {
          this.input = node;
          }} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++,
          });
          this.input.value = '';
        }}>
          Add Todo
        </button>
        <ul>
          {this.props.todos.map( each => <li key={each.id}>{each.text}</li>)}
        </ul>
      </div>
    );
  };
}

const render = () => {
  ReactDOM.render(
    <ToDoApp todos={store.getState().todos} />,
    document.getElementById('root')
  );
};

store.subscribe(render);

render();
