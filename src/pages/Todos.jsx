/** @format */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// -----> Importing 
import {fetchTodos, createTodo, removeTodo } from "../store/reducers/todo";

const Todos = () => {

  const [todoTitle, setTodoTitle] = useState("");
  const todoState = useSelector((storeState) => storeState.todoState);
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  // -----> Submit Handler
  const submitHandler = (e) => {
    e.preventDefault()
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
    }
    dispatch(createTodo(newTodo))
  }
  
  // -----> remove Handler
  const removeHandler = (todoId) => {
    dispatch(removeTodo(todoId));
  }

  return (
    <div>

      {/* FORM CREATION */}
      <form onSubmit={submitHandler}>

        <input type="text" value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)}/>
        <button type="submit"> Create Todo </button>

      </form>

      <h2> All Todos </h2>
      {todoState.loading && <p> Loading.....</p>}
      {todoState.error && <h3> {todoState.error} </h3>}

      <ul>
        {todoState.todos.map((todo) => {
          //console.log(todo);
          return <li key={todo.id}>
            <span> {todo.title}</span>
            <button onClick={() => removeHandler(todo.id)}> Remove Todo </button>
          </li>;
        })}
      </ul>

      {/* 
     Now,
     - We need to dispatch,
     - But as it is an API, there is no payload (no data),
     - we also don't want to call API in component level
     - full logic must be in outside,
     - So, we need to write logics in middleware
     */}
    </div>
  );
};

export default Todos;
