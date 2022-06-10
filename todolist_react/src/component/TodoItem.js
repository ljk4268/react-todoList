import { React } from "react";
import axios from 'axios';
import '../App.css';


function TodoItem(props){

  let isChecked = props.item.complete ? true : false;

  const toggleComplete = ()=>{
    props.item.complete = !props.item.complete
    
    let complete = props.item.complete

    axios.patch(`http://localhost:3001/todos/${props.item.id}`, {'complete':complete})
    .then(props.getTodos)
    .catch((error)=>{console.error(error)})

  }
  
  return(
    <div className="item">
      <div className="content">
        <input
          type="checkbox"
          className='todo_checkbox'
          checked = {isChecked}
          onClick={toggleComplete}
        />
        <label>{props.item.content}</label>
        <input type="text" value={props.item.content} />
      </div>
      <div className="item_buttons content_buttons">
        <button className="todo_edit_button">
          <div>수정</div>
        </button>
        <button className="todo_remove_button">
          <div>삭제</div>
        </button>
      </div>
      <div className="item_buttons edit_buttons">
        <button className="todo_edit_confirm_button">
          <i className="fas fa-check"></i>
        </button>
        <button className="todo_edit_cancel_button">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  )
}

export default TodoItem;