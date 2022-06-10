import React from "react";
import TodoItem from './TodoItem';

function TodoBoard(props){
  

  return(
    <div className="todos">
      {props.todoList.map((item,i)=><TodoItem item={item} getTodos={props.getTodos} key={i}/>)}
    </div>
  )
}

export default TodoBoard;