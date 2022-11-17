const inquirer = require('inquirer');
// Imported and required mysql2 package
const mysql = require('mysql2');
const consoleTable = require('console.table');
// const Connection = require('mysql2/typings/mysql/lib/Connection');
// const express = require('express');

// set up our server listener
// const PORT = process.env.PORT || 3001;
// const app = express();
// //middleware for express.js
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

// Default response for any other request (Not Found)
// not using express.
// app.use((req, res) => {
//     res.status(404).end();
//   });
  
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}. Broncos Country, Let's Ride!`);
//   });


// worked with tutor on creating each functions based on user picks. 
const selections = {
  // function to show all departments
  showDepartments: async () => {
    try {
      const query = "SELECT * FROM department";
      const [data] = await db.promise().query(query);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  // function to view all roles
  viewAllRoles: async () => {
    try {
      const query = "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id";
      const [data] = await db.promise().query(query);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
// function to see all employees
  showEmployees: async () => {
    try {
      const query = `SELECT employee.first_name, employee.last_name, role.title AS title, role.salary AS salary, department.name AS department, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`;
      const [data] = await db.promise().query(query);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
// function to add a new department
  addDepartment: async () => {
    try {
      const askUser = [
        {
          type: 'input',
          name: 'updatedDepartment',
          message: 'What department would you like to add?',
        },
      ];
      const { updatedDepartment } = await inquirer.prompt(askUser);
      const query = `INSERT INTO department (name) VALUES ("${updatedDepartment}")`;
      const data = await db.promise().query(query);
    } catch (err) {
      console.log(err);
    }
  },
  // function to add a new role to database
  addRole: async () => {
    try {
      const askUser2 = [
        {
          type: 'input',
          name: 'newRole',
          message: 'What new roll are you adding?',
        },
        {
          type: 'input',
          name: 'newSalary',
          message: `What salary does this role earn?`,
        },
        {
          type: 'list',
          name: 'assignDepartment',
          message: `Please select which department this new role falls into`,
          choices: async () => {
            const departments = await selections.showDepartments();
            const userPicks = [{ name: 'None', value: null }];
            departments.forEach(({ id, name }) => userPicks.push({ name, value: id }));
            return userPicks;
          },
        },
      ];
      const { newRole, newSalary, assignDepartment } = await inquirer.prompt(askUser2);
      const query = `INSERT INTO role (title, salary, department_id) VALUES ("${newRole}", ${newSalary}, ${assignDepartment})`;
      const data = await db.promise().query(query);
    } catch (err) {
      console.log(err);
    }
  },
  // function to add a new employee to database
  addEmployee: async () => {
    try {
      const askUser3 = [
        {
          type: 'input',
          name: 'given_name',
          message: 'What is the first name?',
        },
        {
          type: 'input',
          name: 'surname',
          message: 'What is the last name?',
        },
        {
          type: 'list',
          name: 'addedRole',
          message: 'What is this employee\'s role?',
          choices: async () => {
            const rolePick = [{ name: 'None', value: null }];
            const roleChoices = await selections.viewAllRoles();
            roleChoices.forEach(({ id, title }) => rolePick.push({ name: title, value: { id, title }}));
            return rolePick;
          },
        },
        {
          type: 'list',
          name: 'managerTie',
          message: "Who is this employee's manager?",
          choices: async () => {
            const managerPick = [{ name: 'None', value: null }];
            const currentEmployees = await selections.showEmployees();
            currentEmployees.forEach(({ id, first_name, last_name }) => managerPick.push({ name: `${first_name} ${last_name}`, value: { id }}));
            return managerPick;
          },
        },
      ];
      const { given_name, surname, addedRole, managerTie } = await inquirer.prompt(askUser3);
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${given_name}", "${surname}", ${addedRole.id || null}, ${managerTie.id || null} )`;
      const data = await db.promise().query(query);
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = selections;