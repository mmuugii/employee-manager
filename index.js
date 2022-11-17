// Created on November 16, 2022 by Muugii Munkhbold
// This index file is the first file that initializes the inquirer prompt when the user boots it up
// worked with tutor J. Delgado

const inquirer = require('inquirer');
const selections = require('./connection.js');

// console.log(selections);

// command line prompts
const commandPrompts = async () => {
    try {
        const questions = [
            {
                type: "list",
                name: "choice",
                message: "Please indicate what you would like to do",
                choices: [
                    "View All Employees",
                    "Add Employee",
                    "Update Employee Role",
                    "View All Roles",
                    "Add Role",
                    "View All Departments",
                    "Add Department",
                    "Quit"
                ],
            },
        ];
        // call to function depending on what the user selects
        const userAnswer = await inquirer.prompt(questions);
        console.log(userAnswer);
        switch (userAnswer.choice) {
            case "View All Employees":
                const employeeList = await selections.showEmployees();
                console.table(employeeList);
                break;
                case "View All Roles":
                    const allRoleList = await selections.viewAllRoles();
                    console.table(allRoleList);
                    break;
                case "View All Departments":
                    const departmentsList = await selections.showDepartments();
                    console.table(departmentsList);
                    break;
            case "Add Employee":
                await selections.addEmployee();
                break;
            case "Update Employee Role":
                await selections.updateEmployeeRole();
                break;
            case "Add Role":
                await selections.addRole();
                break;
            case "Add Department":
                await selections.addDepartment();
                break;
            case "Quit":
                process.exit();
            default:
                break;
        }
        commandPrompts();
    } catch (err) {
        console.log(err);
    }
};
commandPrompts();