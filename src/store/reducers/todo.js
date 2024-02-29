 /** @format */

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  todos: [],
  error: "",
};

// -----> Thunk
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await fetch(`http://localhost:5000/todos`);
  const todos = await res.json();
  return todos;
});

// -----> CRUD  //----> CREATE
 export const createTodo = createAsyncThunk( 
  /* slice এর নামের সাথে prefix - Action Type */ 'todos/createTodo',
  
  /*  async function */ async (todoObj) => {       // -----> todoObj argument  // -----> As we are receving data 
    
    // -----> Todo Create  
    const res = await fetch(`http://localhost:5000/todos`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoObj),
    });
    const data = await res.json()
    console.log(data);
    return data;
  }
 )

 // -----> Remove Async Thunk
  export const removeTodo = createAsyncThunk('todos/removeTodo', async (todoId) => {
    const res = await fetch(`http://localhost:5000/todos/${todoId}`, {
           method: "DELETE",
      });
    // const data = await res.json()
    // console.log(data, "remove Todo");
    return todoId;
  })

// -----> Creating Slice 
export const todoSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
       })
      .addCase(fetchTodos.fulfilled, (state, action) =>{
        state.loading = false;
        state.todos = action.payload; /* THUNK এর return করা value টা পাবে সে  */
      })
      .addCase(fetchTodos.rejected,(state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTodo.fulfilled, (state, action)=> {
        state.todos.push(action.payload)
      })
      .addCase(removeTodo.fulfilled, (state, action)=> {
        /* state.filter বা state এর slice ও possible */
        state.todos = state.todos.filter(item => item.id !== action.payload)
      })
  }

  
})

// -----> REDUX TOOLKIT 

//export default todoReducer;
