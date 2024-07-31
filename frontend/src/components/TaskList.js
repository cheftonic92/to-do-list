import React from 'react';

const TaskList = ({ tasks, updateTask, deleteTask, setTask }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="card mb-2">
          <div className="card-body">
            <h5 className="card-title">{task.title}</h5>
            <p className="card-text">{task.description}</p>
            <button
              className="btn btn-warning mr-2"
              onClick={() => setTask(task)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
