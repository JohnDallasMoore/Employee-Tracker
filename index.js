const inquirer = require('inquirer');
const mysql = require('mysql2');
const clogIntro = require('./lib/clogIntro');
const db = require('./config/connection')


function init(){
    console.log(clogIntro);
    start()
};

init();

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
                    'Update an employee role',
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
                case 'Update an employee role':
                    updateEmployeeRole();
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
        `SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        INNER JOIN department ON role.department_id = department.id
        `,
        (err, results) => {
            if (err) throw err;

            console.table(results);
            start();
        }
    );
};


// Function to view all employees
function viewAllEmployees() {
    db.query(
        `SELECT employees.id, employees.first_name, employees.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
        FROM employees 
        LEFT JOIN role ON employees.role_id = role.id 
        LEFT JOIN department ON role.department_id = department.id 
        LEFT JOIN employees manager ON employees.manager_id = manager.id`,
        (err, results) => {
            if (err) throw err;
    
            console.table(results);
            start();
        }
    );
  }


// Function to add a department
function addDepartment(){
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the name of the department:',
            },
        ])
        .then((answers) => {
            db.query(
                'INSERT INTO department (name) VALUES (?)',
                [answers.name],
                (err) => {
                    if (err) throw err;
                    console.log('Department added successfully.');
                    start();
                }
            );
        });
};


// Function to add a role
function addRole(){
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title of the role:',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for the role:',
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the department ID for the role:',
            },
        ])
        .then((answers) => {
            db.query(
                'INSERT INTO role SET ?',
                {
                    title: answers.title,
                    salary: answers.salary,
                    department_id: answers.department_id,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Role added successfully.');
                    start();
                }
            );
        });
};


// Function to add an employee
function addEmployee(){
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the employees first name:',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the employees last name:',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the employees role ID:',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the employees manager ID:',
        },
    ])
    .then((answers) => {
        db.query(
            'INSERT INTO employees SET ?',
            {
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: answers.role_id,
                manager_id: answers.manager_id,
            },
            (err) => {
                if (err) throw err;
                console.log('Employee added successfully.');
                start();
            }
        );
    });
};

// Function to update an employee's role
function updateEmployeeRole() {
    db.query("SELECT * FROM employees", (err, employees) => {
      if (err) throw err;
  
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Select the employee to update:",
            choices: employees.map((employee) => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
            })),
          },
          {
            type: "input",
            name: "roleId",
            message: "Enter the employee's new role ID:",
          },
        ])
        .then((answers) => {
          db.query(
            "UPDATE employees SET ? WHERE ?",
            [{ role_id: answers.roleId }, { id: answers.employeeId }],
            (err) => {
              if (err) throw err;
              console.log("Employee role updated successfully.");
              start();
            }
          );
        });
    });
  }