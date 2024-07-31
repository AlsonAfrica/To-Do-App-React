import React from 'react';
import './ToDoList.css'; // Create this CSS file for styling

const ToDoList = ({ todos, setEditingTodo, deleteTodo, setViewTodo }) => {
    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <li key={todo.id} className="todo-item">
                    <div className="todo-info">
                        <h3>{todo.task}</h3>
                        <p>Priority: {todo.priority} | Date: {todo.date} | Time: {todo.time}</p>
                    </div>
                    <div className="todo-actions">
                        <button onClick={() => setEditingTodo(todo)}>Edit</button>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                        <button onClick={() => setViewTodo(todo)}>View</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ToDoList;
