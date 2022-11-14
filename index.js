const inquirer = require('inquirer');
const connection = require('./connection.js');

// command line prompts
const commandPrompts = async () => {
    try {
        const questions = [
            {
                type: "list",
                name: "actions",
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
        // actions (functions) to selects from when the user selects each option
        const userAnswer = await inquirer.createPromptModule(commandPrompts);
        switch (userAnswer.action) {
            case "View All Employees":
                const employeeList = await actions.showEmployees();
                console.table(employeeList);
                break;
            case "Add Employee":
                await actions.addEmployee();
                break;
            case "Update Employee Role":
                await actions.updateEmployeeRole();
                break;
            case "View All Roles":
                const allRoleList = await actions.viewAllRoles();
                console.table(allRoleList);
                break;
            case "Add Role":
                await actions.addRole();
                break;
            case "View All Departments":
                const departmentsList = await actions.showDepartments();
                console.table(departmentsList);
                break;
            case "Add Department":
                await actions.addDepartment();
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