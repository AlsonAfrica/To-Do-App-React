import React, { useState, useEffect } from 'react';
import './HomePage.css';
import ToDoForm from './ToDoForm';
import ToDoList from './ToDoList';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import AnchorTemporaryDrawer from './Drawer';
import { postTask, getTasks } from './api'; // Import API functions

const HomePage = () => {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null);
    const [viewTodo, setViewTodo] = useState(null);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    const userId = localStorage.getItem('userId'); 

    useEffect(() => {
        if (userId) {
            fetchTasks();
        }
    }, [userId]);

    const fetchTasks = async () => {
        try {
            const tasks = await getTasks(userId);
            setTodos(tasks);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    const addTodo = async (todo) => {
        try {
            const newTodo = await postTask(userId, todo);
            setTodos([...todos, newTodo]);
        } catch (error) {
            console.error('Error posting task:', error);
        }
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter todos based on search query
    const filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="home-page">
            <header className="header">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} title="Logout">
                        <ExitToAppIcon />
                    </button>
                </Link>
                  <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                </div>
                {/* <h1 className='Nav-Logo'>
                    <span className='W'>W</span><span className='E'>E</span><span className='E'>E</span><span className='K'>K</span><span className='L'>L - </span><span className='Y'>Y</span> To-Do App
                </h1> */}
                
                <AnchorTemporaryDrawer />
              
            </header>
            <h1 className='Nav-Logo'>
                    <span className='W'>W</span><span className='E'>E</span><span className='E'>E</span><span className='K'>K</span><span className='L'>L - </span><span className='Y'>Y</span> To-Do App
                </h1>
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
                        todos={filteredTodos} // Use filtered todos
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
