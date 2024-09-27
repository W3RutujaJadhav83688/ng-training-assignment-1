const express = require('express');
const mysql = require('mysql');
const config = require('config');

const app = express.Router();
app.use(express.json());  // Middleware to parse JSON request bodies

const connectionDetails = {
  host: config.get("host"),
  database: config.get("database"),
  port: config.get("serverport"),
  user: config.get("user"),
  password: config.get("password")
};

// GET: Retrieve all tasks
app.get("/", (request, response) => {
  let querytext = 'SELECT * FROM Tasks';
  let connection = mysql.createConnection(connectionDetails);
  connection.connect();
  connection.query(querytext, (err, result) => {
    response.setHeader("Content-Type", "application/json");
    if (err == null) {
      response.write(JSON.stringify(result));
    } else {
      response.write(JSON.stringify(err));
    }
    connection.end();
    response.end();
  });
});

// POST: Add a new task
app.post("/", (request, response) => {
    let { task_name, assigned_to, status, due_date, priority, comments } = request.body;
    
    let querytext = `INSERT INTO Tasks (task_name, assigned_to, status, due_date, priority, comments) 
                     VALUES ('${task_name}', ${assigned_to}, '${status}', '${due_date}', '${priority}', '${comments}');`;
  
    let connection = mysql.createConnection(connectionDetails);
    connection.connect();
    connection.query(querytext, (err, result) => {
      response.setHeader("Content-Type", "application/json");
      if (err == null) {
        response.write(JSON.stringify(result));
      } else {
        response.write(JSON.stringify(err));
      }
      connection.end();
      response.end();
    });
  });
  

// PUT: Update a task
app.put("/:taskid", (request, response) => {
    let { task_name, assigned_to, status, due_date, priority, comments } = request.body;
  
    // Construct the SQL query to update the task with the provided data
    let querytext = `UPDATE Tasks 
                     SET task_name = '${task_name}', 
                         assigned_to = ${assigned_to}, 
                         status = '${status}', 
                         due_date = '${due_date}', 
                         priority = '${priority}', 
                         comments = '${comments}' 
                     WHERE task_id = ${request.params.taskid}`;
  
    console.log(querytext); // Log the query to debug if needed
  
    let connection = mysql.createConnection(connectionDetails);
    connection.connect();
    
    connection.query(querytext, (err, result) => {
      response.setHeader("Content-Type", "application/json");
      if (err == null) {
        response.write(JSON.stringify(result));  // Send success response
      } else {
        response.write(JSON.stringify(err));    // Send error details if the query fails
      }
      connection.end();
      response.end();
    });
  });
  

// DELETE: Delete a task
app.delete("/:taskid", (request, response) => {
  let querytext = `DELETE FROM Tasks WHERE task_id = ${request.params.taskid}`;

  console.log(querytext);

  let connection = mysql.createConnection(connectionDetails);
  connection.connect();
  connection.query(querytext, (err, result) => {
    response.setHeader("Content-Type", "application/json");
    if (err == null) {
      response.write(JSON.stringify(result));
    } else {
      response.write(JSON.stringify(err));
    }
    connection.end();
    response.end();
  });
});

module.exports = app;
