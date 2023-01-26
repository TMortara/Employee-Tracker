const questions = {
    menu: [
        {
            type: "list",
            message: "What would you like to do?",
            name: "menuAction",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Exit"],
        }
    ],

    addDepartment: [
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "deptName"
        }
    ],

    addRole: function() {
        return [
            {
                type: "input",
                message: "What is the name of the new role?",
                name: "newRoleName"
            },
            {
                type: "input",
                message: "What is the salary for this role?",
                name: "newRoleSalary",
                // validate: function(answer) {
                //     if (!isNaN(answer)) {
                //         return console.log('Salary requires a valid number without decimal places');
                //     }
                //     return true;
                // }
            },
            {
                type: "input",
                message: "What department does this role belong to?",
                name: "newRoleDept"
            }
        ]
    },

    addEmployee: function() {
        return [
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "newEmployeeFN"
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "newEmployeeLN"
            },
            {
                type: "input",
                message: "What is the employee's role?",
                name: "newEmployeeRole"
            },
            {
                type: "input",
                message: "What is the of the employee's manager?",
                name: "newEmployeeManager"
            }
        ]
    }

    }

module.exports = questions;