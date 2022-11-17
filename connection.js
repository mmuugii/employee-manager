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

const selections = {
  showDepartments: async () => {
    try {
      const query = "SELECT * FROM department";
      const [data] = await db.promise().query(query);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  viewAllRoles: async () => {
    try {
      const query = "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id";
      const [data] = await db.promise().query(query);
      return data;
    } catch (err) {
      console.log(err);
    }
  },

  showEmployees: async () => {
    try {
      const query = "SELECT employee.first_name, employee.last_name, employee.manager_id, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id";
      const [data] = await db.promise().query(query);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
}

module.exports = selections;