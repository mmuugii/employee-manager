const inquirer = require('inquirer');
// Imported and required mysql2 package
const mysql = require('mysql2');
const consoleTable = require('console.table');
const express = require('express');

// set up our server listener
const PORT = process.env.PORT || 3001;
const app = express();
//middleware for express.js
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}. Broncos Country, Let's Ride!`);
  });