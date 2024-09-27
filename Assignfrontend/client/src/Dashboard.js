import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import EditTask from './EditTask';
import NewTask from './NewTask';
import TaskList from './TaskList';
//import './common.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  // Fetch tasks from the backend
  const fetchTasks = () => {
    axios.get('http://localhost:9999/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  };

  useEffect(() => {
    fetchTasks(); // Initial load of tasks
  }, []);

  // Create a new task
  const handleCreateTask = (newTask) => {
    axios.post('http://localhost:9999/tasks', newTask)
      .then(() => {
        fetchTasks();
        setShowNewTaskForm(false);
      })
      .catch(error => console.error('Error creating task:', error));
  };

  // Update an existing task
  const handleUpdateTask = (updatedTask) => {
    axios.put(`http://localhost:9999/tasks/${updatedTask.task_id}`, updatedTask)
      .then(() => {
        fetchTasks();
        setEditingTask(null);
      })
      .catch(error => console.error('Error updating task:', error));
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:9999/tasks/${taskId}`)
      .then(() => fetchTasks())
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div>
      <h1>Task Management</h1>

      {showNewTaskForm ? (
        <NewTask onCreate={handleCreateTask} />
      ) : editingTask ? (
        <EditTask task={editingTask} onSave={handleUpdateTask} onCancel={() => setEditingTask(null)} />
      ) : (
        <div>
          <button onClick={() => setShowNewTaskForm(true)}>New Task</button>
          <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDeleteTask} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;