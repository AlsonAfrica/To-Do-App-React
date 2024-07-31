import React, { useState, useEffect } from 'react';
import './ToDoForm.css'; // Create this CSS file for styling

const ToDoForm = ({ addTodo, updateTodo, editingTodo, clearEdit, viewTodo }) => {
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('medium');
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
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter task"
                    required
                />
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
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

