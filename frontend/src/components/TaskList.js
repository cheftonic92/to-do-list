// src/components/TaskList.js

import React, { useEffect, useState } from 'react';
import { getTasksByProject } from '../services/ApiService';
import TaskCard from './TaskCard';

const TaskList = ({ show, onClose, projectId, onEditTask, onDeleteTask, projectName }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasksByProject(projectId);
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [projectId]);
  

  return (
    <div className="card mb-0" style={{ backgroundColor: '#e0eafc', padding: '20px', paddingBottom: '2px', display: show ? 'block' : 'none' }}>
      <h5>Tareas del Proyecto</h5>
      <div className="mt-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEditTask={(projectId, projectName, task) => onEditTask(projectId, projectName, task)} // Llama a la función correcta para editar
            onDeleteTask={() => onDeleteTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;


