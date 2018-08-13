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

const FilterLink = ({
  filter,
  children
}) => {
  return(
    <button
       onClick={ e => {
         e.preventDefault();
         store.dispatch({
           type: 'SET_VISIBILITY_FILTER',
           filter
         });
       }}>
      {children}
    </button>
  );
};

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(each => each.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(each => !each.completed);
    default:
      return todos;
  }
};

let nextTodoId = 0;
const { Component } = React;
class ToDoApp extends Component {
  render () {
    const {todos, visibilityFilter} =this.props;
    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter,
    );
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
          {visibleTodos.map( each =>
            <li key={each.id}
                onClick={() => {
                  store.dispatch({
                    type: 'TOGGLE_TODO',
                    id: each.id,
                  });
                }}
                style={{
                  textDecoration:
                    each.completed? 'line-through': 'none'
                }}>{each.text}</li>)}
        </ul>
        <p>
          Show:{' '}
          <FilterLink filter='SHOW_ALL'>All</FilterLink>{' '}
          <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>{' '}
          <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
        </p>
      </div>
    );
  };
}

const render = () => {
  const data = store.getState();
  ReactDOM.render(
    <ToDoApp {...data} />,
    document.getElementById('root')
  );
};

store.subscribe(render);

render();
