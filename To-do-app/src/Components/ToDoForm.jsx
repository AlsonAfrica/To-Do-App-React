import React, { useState, useEffect } from 'react';
import './ToDoForm.css';
import { InputLabel } from '@mui/material';

const priorityStyles = {
    Priorities: { color: 'white' },
    low: { backgroundColor: 'rgb(80, 200, 120)', color: 'white' },
    medium: { backgroundColor: 'rgb(255, 255, 143)', color: 'black' },
    high: { backgroundColor: '	rgb(233, 116, 81)', color: 'white' },
   
};

const ToDoForm = ({ addTodo, updateTodo, editingTodo, clearEdit, viewTodo }) => {
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (editingTodo) {
            setTask(editingTodo.task);
            setPriority(editingTodo.priority);
            setDate(editingTodo.date || '');
            setTime(editingTodo.time || '');
        }
    }, [editingTodo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTodo) {
            updateTodo({
                ...editingTodo,
                task,
                priority,
                date,
                time,
            });
            clearEdit();
        } else {
            addTodo({
                id: Date.now(),
                task,
                priority,
                date,
                time,
            });
        }
        setTask('');
        setPriority('medium');
        setDate('');
        setTime('');
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="todo-form">
            <form onSubmit={handleSubmit}>
            <InputLabel>Task Name</InputLabel>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter task"
                    required
                />
                <InputLabel>Priority</InputLabel>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    style={priorityStyles[priority]}
                     placeholder="Priority"
                >   
                    <option value="low" style={priorityStyles.low}>Low</option>
                    <option value="medium" style={priorityStyles.medium}>Medium</option>
                    <option value="high" style={priorityStyles.high}>High</option>
                </select>
                <InputLabel>Date</InputLabel>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <InputLabel>Time: AM-PM</InputLabel>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <button type="submit">{editingTodo ? 'Update' : 'Add'} To-Do</button>
            </form>
            {viewTodo && (
                <div className={`modal ${isModalOpen ? 'open' : ''}`}>
                    <div className="modal-content">
                        <h2>To-Do Details</h2>
                        <p><strong>Task:</strong> {viewTodo.task}</p>
                        <p><strong>Priority:</strong> {viewTodo.priority}</p>
                        <p><strong>Date:</strong> {viewTodo.date}</p>
                        <p><strong>Time:</strong> {viewTodo.time}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ToDoForm;
