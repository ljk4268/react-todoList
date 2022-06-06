
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './App.css';

import TodoBoard from './component/TodoBoard'

function App() {

  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const todoInput = useRef()


  useEffect(()=>{
    getTodos();
  },[])

  useEffect(()=>{
    console.log(todoList);
  },[todoList])
  
  const getTodos = () => {
    axios.get('http://localhost:3001/todos')
    .then((data)=>{setTodoList(data.data)})
  }

  const addTodo = (e)=>{
    e.preventDefault()
    const content = inputValue
    if(!inputValue) return
    const todo = {
      content,
      complete:false,
    }
    axios.post('http://localhost:3001/todos',todo)
    .then(getTodos)
    .then(()=>{
      todoInput.value = ''
      todoInput.focus()
    })
    .catch((error) => console.error(error.message))
  }

  return (
    <div className="wrap">
      <div className="header">
        <h2>TO DO LIST</h2>
        <form className="todo_form">
          <input
            type="text"
            className="todo_input"
            placeholder="할 일을 입력해 주세요."
            autofocus="true"
            onChange = {(e)=>{setInputValue(e.target.value)}}
            ref={todoInput}
          />
          <button type="submit" className="todo_submit_button">
            <div className="plus" onClick={addTodo}>+</div>
          </button>
        </form>
      </div>
        <TodoBoard todoList={todoList}/>
    </div>

    
  );
}

export default App;
