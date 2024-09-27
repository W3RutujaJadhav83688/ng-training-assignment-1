import React, { useState } from 'react';

const NewTask = ({ onCreate }) => {
  const [taskName, setTaskName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { task_name: taskName, assigned_to: assignedTo, status, due_date: dueDate, priority, comments };
    onCreate(newTask);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Task</h2>
      <div>
        <label>Task Name</label>
        <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      </div>
      <div>
        <label>Assigned To</label>
        <input type="text" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
      </div>
      <div>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div>
        <label>Due Date</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>
      <div>
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <label>Comments</label>
        <input type="text" value={comments} onChange={(e) => setComments(e.target.value)} />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default NewTask;