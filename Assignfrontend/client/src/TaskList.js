import React, { useState } from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Handle confirmation for deletion
  const confirmDelete = (taskId) => {
    onDelete(taskId); // Calls parent handler to delete task
    setTaskToDelete(null); // Close the modal after deletion
  };

  return (
    <div>
      <h2>Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.task_id}>
              <td>{task.task_name}</td>
              <td>{task.assigned_to}</td>
              <td>{task.status}</td>
              <td>{new Date(task.due_date).toLocaleDateString()}</td> {/* Format the date */}
              <td>{task.priority}</td>
              <td>
                <button onClick={() => onEdit(task)}>Edit</button>
                <button onClick={() => setTaskToDelete(task)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {taskToDelete && (
        <div className="modal">
          <h3>Delete Task</h3>
          <p>Are you sure you want to delete {taskToDelete.task_name}?</p>
          <button onClick={() => confirmDelete(taskToDelete.task_id)}>Yes</button>
          <button onClick={() => setTaskToDelete(null)}>No</button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
