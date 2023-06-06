const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employee_db',
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the employee database.');

  // Start the application
  start();
});

// Function to start the application

// Function to view all departments

// Function to view all roles

// Function to view all employees

// Function to add a department

// Function to add a role

// Function to add an employee

// Function to update an employee's role