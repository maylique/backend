import { useEffect, useState } from "react";

const TodoList = () => {
    const [todo, setTodo] = useState([]);
    const [strich, setStrich] = useState(true)

    useEffect(() => {
        fetch('http://localhost:3000/todos')
            .then(resp => resp.json())
            .then(resp => setTodo(resp));
    }, []);

const lineDone = (id) => {
    const newStrich = !strich;
    setStrich(newStrich)
    fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({todoDone: newStrich})
    })
    window.location.reload()
}

return (
    <>
        {todo.map((to) => (
            <div key={to.todoId}>
                <p 
                    style={to.todoDone ? {textDecoration: "line-through"} : {}}
                    onClick={() => lineDone(to.todoId)}
                >
                    {to.todo}
                </p>
            </div>
        ))}
    </>
);
}

export default TodoList;