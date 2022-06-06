import React from "react";
import '../App.css';


function TodoItem(props){

  return(
    <div className="item">
      <div className="content">
        <input
          type="checkbox"
          className='todo_checkbox'
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