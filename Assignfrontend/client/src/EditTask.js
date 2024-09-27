import React, { useState } from 'react';

const EditTask = ({ task, onSave, onCancel }) => {
  const [taskName, setTaskName] = useState(task.task_name);
  const [assignedTo, setAssignedTo] = useState(task.assigned_to);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(task.due_date);
  const [priority, setPriority] = useState(task.priority);
  const [comments, setComments] = useState(task.comments);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { 
      ...task, 
      task_name: taskName, 
      assigned_to: assignedTo, 
      status, 
      due_date: dueDate, 
      priority, 
      comments 
    };
    onSave(updatedTask);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Task</h2>
      <div>
        <label>Task Name</label>
        <input 
          type="text" 
          value={taskName} 
          onChange={(e) => setTaskName(e.target.value)} 
        />
      </div>
      <div>
        <label>Assigned To</label>
        <input 
          type="text" 
          value={assignedTo} 
          onChange={(e) => setAssignedTo(e.target.value)} 
        />
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
        <input 
          type="date" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
        />
      </div>
      <div>
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <label>Comments</label>
        <textarea 
          value={comments} 
          onChange={(e) => setComments(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EditTask;
