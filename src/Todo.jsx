import React, { useState } from 'react';
import './index.css';
import { InputTodo } from './components/InputTodo';
import { IncompleteTodos } from './components/IncompleteTodos';
import { CompleteTodos } from './components/CompleteTodos';

export const Todo = () => {
    // eslint-disable-next-line
  const [ todoText, setTodoText ] = useState("");
  // eslint-disable-next-line
  const [ incompleteTodos, setIncompleteTodos ] = useState([]);
  // eslint-disable-next-line
  const [ completeTodos, setCompleteTodos ] = useState([]);


  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos]
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  }

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    // eslint-disable-next-line
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos)
  }

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos)
  }

  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

  return (
    <>
    <InputTodo 
      todoText={todoText} 
      onChange={onChangeTodoText} 
      onClick={onClickAdd} 
      disabled={isMaxLimitIncompleteTodos}
    />
    {incompleteTodos.length >= 5 && (
      <p style={{ color: "red" }}>登録できるTODOは5こまでだよ</p>
    )}
    <IncompleteTodos
      todos={incompleteTodos} 
      onClickComplete={onClickComplete} 
      onClickDelete={onClickDelete}
    />
    <CompleteTodos 
      todos={completeTodos} 
      onClickBack={onClickBack}
    />
    </>
  )
}
