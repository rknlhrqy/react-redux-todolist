// import React from 'react'
import deepFreeze from 'deep-freeze';
import { todos } from './Todo';

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux',
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);

};


const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: false
    }
  ];
  const action = {
    text: 'Learn Redux',
    type: 'TOGGLE_TODO',
    id: 0.
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: true 
    },
    {
      id: 1,
      text: 'Go shopping',
      completed: false 
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);

};

export const runTests = () => {
  testAddTodo();
  testToggleTodo();
  console.log('Test passed!');
  return null;
};

