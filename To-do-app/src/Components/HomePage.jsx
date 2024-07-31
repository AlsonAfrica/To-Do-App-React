import React, { useState } from 'react';
import './HomePage.css';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
//icon//
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// button
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);
    const [viewTodo, setViewTodo] = useState(null);

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    };

    const updateTodo = (updatedTodo) => {
        setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const clearEdit = () => {
        setEditingTodo(null);
    };

    return (
        <div className="home-page">
            <header className="header">
            <Link to="/" style={{ textDecoration: 'none' }}>
                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                    <ExitToAppIcon />
                </button>
            </Link>
             
                <h1>To-Do App</h1>
            </header>
            <div className="content">
                <div className="form-container">
                    <ToDoForm 
                        addTodo={addTodo}
                        updateTodo={updateTodo}
                        editingTodo={editingTodo}
                        clearEdit={clearEdit}
                        viewTodo={viewTodo}
                    />
                </div>
                <div className="list-container">
                    <ToDoList 
                        todos={todos}
                        setEditingTodo={setEditingTodo}
                        deleteTodo={deleteTodo}
                        setViewTodo={setViewTodo}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
