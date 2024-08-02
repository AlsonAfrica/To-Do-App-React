import React from 'react';
import './ToDoList.css';

const priorityColors = {
    low: 'rgb(80, 200, 120)',
    medium: 'rgb(255, 255, 143)',
    high: '	rgb(210, 4, 45)'
};

const ToDoList = ({ todos, setEditingTodo, deleteTodo, setViewTodo }) => {
    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    className="todo-item"
                    style={{ backgroundColor: priorityColors[todo.priority] }}
                >
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

