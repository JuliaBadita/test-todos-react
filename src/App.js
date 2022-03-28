import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';

// Generates random ids
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STRORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  // Save/Store the Todos in our aapplication 
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STRORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STRORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  //

  function toggleTodo(id) {

    //To create a copy of our current todos

    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  // Link to the button add todo
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return

    // We can see the todos name above the input

    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    //
    todoNameRef.current.value = null
  }

  // Link to the button Clear todos
  function handleClearTodos() {

    //Non-complete todos : todos.filter(todo => !todo.complete)
    const newTodos = todos.filter(todo => !todo.complete)
    //
    // When we click on the button now = it clears all the todos completed/checked
    setTodos(newTodos)
  }


  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo} />
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed Todos</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

/// la div {todos.filter(todo => !todo.complete).length} =
/// sert à comptabiliser combien de todos non-cochée il reste 


export default App;