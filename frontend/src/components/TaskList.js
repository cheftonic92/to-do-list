import React, { useEffect, useState } from 'react';
import { getTasksByProject } from '../services/ApiService';
import TaskCard from './TaskCard';

const TaskList = ({ show, projectId, onEditTask, onDeleteTask }) => {
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
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            data={task}
            onEditTask={() => onEditTask(task)} // Llama a la función de edición correctamente
            onDeleteTask={() => onDeleteTask(task.id)} // Llama a la función de eliminación correctamente
          />
        ))
      ) : (
        <p>No hay tareas disponibles para este proyecto.</p>
      )}
    </div>
    </div>
  );
};

export default TaskList;
