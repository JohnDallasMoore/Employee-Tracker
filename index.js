const inquirer = require('inquirer');
const mysql = require('mysql2');
const clogIntro = require('./lib/clogIntro');

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employee_db',
});
console.log(clogIntro); 
// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the employee database.');

  // Start the application
  start();
});

// Function to start the application
function start(){
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Exit',
                ],
            },
        ])
        .then((answers) => {
            switch (answers.action) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Exit':
                    db.end();
                    break;
            }
        });
    };


// Function to view all departments
function viewAllDepartments() {
    db.query('SELECT * FROM department', (err,results) => {
        if (err) throw err;
        
        console.table(results);
        start();
    });
};


// Function to view all roles
function viewAllRoles(){
    db.query(
        "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id",
        (err, results) => {
            if (err) throw err;

            console.table(results);
            start();
        }
    );
};


// Function to view all employees
function viewAllEmployees(){

};


// Function to add a department
function addDepartment(){

};


// Function to add a role
function addRole(){

};


// Function to add an employee
function addEmployee(){

};