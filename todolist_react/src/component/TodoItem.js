import { React, useEffect, useRef, useState } from "react";
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

  // current 왜 쓰는지 
  // 동작 순서 다시 
  // input value(=useState) onChange 셋트


  const editInput = useRef()
  const label = useRef()
  let [changeDisplay, setChangeDisplay] = useState ({'display': 'block'})
  let [changeInput, setChangeInput] = useState ({'display': 'none'})
  let [contentButtons, setContentButtons] = useState ({'display': 'block'})
  let [editButtons, setEditButtons] = useState ({'display': 'none'})
  let [editButtonState, setEditButtonState] = useState ('')
  let [editText, setEditText] = useState('')


  const changeEditMode = ()=>{
    changeDisplay = setChangeDisplay({'display': 'none'});
    editInput.current.style.display = 'block'
    editInput.current.style.fontWeight = 'bold'
    // changeInput = setChangeInput({'display' : 'block'});
    contentButtons = setContentButtons({'display': 'none'});
    editButtons = setEditButtons({'display' : 'block'});
    editButtonState = setEditButtonState('수정')
    editInput.current.focus()
    setEditText(props.item.content)
    
  }
  
  const cancelEditMode = ()=>{
    changeDisplay = setChangeDisplay({'display': 'block'});
    editInput.current.style.display = 'none'
    // changeInput = setChangeInput({'display' : 'none'});
    contentButtons = setContentButtons({'display': 'block'});
    editButtons = setEditButtons({'display' : 'none'});
    editInput.current.value = label.current.innerText
  }
  
  const onChangeEdit = (e)=>{
    setEditText(e.target.value)
  }

  const changeUi = () => {
    changeDisplay = setChangeDisplay({'display': 'block'});
    editInput.current.style.display = 'none'
    // changeInput = setChangeInput({'display' : 'none'});
    contentButtons = setContentButtons({'display': 'block'});
    editButtons = setEditButtons({'display' : 'none'});
    label.current.innerText = ''
  
}

  const editTodo = ()=>{

    axios.patch(`http://localhost:3001/todos/${props.item.id}`, {"content": editText})
    .then(props.getTodos)
    .then(changeUi) 
    .catch((error)=>{console.error(error)})

  }

  const removeTodo = ()=>{
    axios.delete(`http://localhost:3001/todos/${props.item.id}`)
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
        <label style = {changeDisplay} ref={label}>{props.item.content}</label>
        <input type="text" value={editText} style={changeInput} ref={editInput} onChange={onChangeEdit}/>
        {/* 리액트는 input에 value라는 속성을 쓰면 사용자가 input 값을 수정할 수 없음 
        따라서 onChange함수를 통해서 수정할 수 있게 됨.  
        대신 value값에는 usestate값이 들어가야하나봄.
        onChange함수에는 usestate함수 값을 수정하는 코드가 들어가야함. 
        걍 input value(=useState) onChange 셋트라 생각하고 외워*/}
      </div>
      <div className="item_buttons content_buttons" style = {contentButtons}>
        <button className="todo_edit_button" onClick={changeEditMode}>
          <div>수정</div>
        </button>
        <button className="todo_remove_button" onClick={removeTodo}>
          <div>삭제</div>
        </button>
      </div>
      <div className="item_buttons edit_buttons" style={editButtons}>
        <button className="todo_edit_confirm_button" onClick={editTodo}>
          <div>편집</div>
        </button>
        <button className="todo_edit_cancel_button" onClick={cancelEditMode}>
          <div>취소</div>
        </button>
      </div>
    </div>
  )
}

export default TodoItem;