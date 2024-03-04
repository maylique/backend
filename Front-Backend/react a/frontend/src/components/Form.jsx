import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Form = () => {

    const todoInput = useRef()
    const todoDone = false
    const todoId = uuidv4()
    const handleSubmit = () => {
        const todo = todoInput.current.value
        fetch('http://localhost:3000/todos', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({todo, todoDone, todoId})
        })
        window.location.reload()
    }
    return ( 
        <>
        <form action="">
            <input ref={todoInput} type="text" placeholder="add todo"/>
            <button type="button" onClick={handleSubmit}>Add</button>
        </form>
        </>
     );
}
 
export default Form;