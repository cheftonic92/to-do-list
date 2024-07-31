import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost/to-do-list-backend/public/index.php');
      setTasks(response.data);
    } catch (error) {
      toast.error('Error fetching tasks');
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost/to-do-list-backend/public/index.php', task);
      setTasks([...tasks, { ...task, id: response.data.id }]);
      toast.success('Task added successfully');
    } catch (error) {
      toast.error('Error adding task');
    }
  };

  const updateTask = async (task) => {
    try {
      await axios.put('http://localhost/to-do-list-backend/public/index.php', task);
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Error updating task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete('http://localhost/to-do-list-backend/public/index.php', { data: { id } });
      setTasks(tasks.filter(t => t.id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Error deleting task');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">To-Do List</h1>
      <TaskForm addTask={addTask} task={task} setTask={setTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} setTask={setTask} />
    </div>
  );
}

export default App;
