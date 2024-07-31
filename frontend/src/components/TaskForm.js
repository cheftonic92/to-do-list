import React from 'react';

const TaskForm = ({ addTask, task, setTask }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.description) return;
    addTask(task);
    setTask({ title: '', description: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <textarea
          name="description"
          className="form-control"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Add Task</button>
    </form>
  );
};

export default TaskForm;
