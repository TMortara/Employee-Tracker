const questions = {
    menu: [
        {
            type: "list",
            message: "What would you like to do?",
            name: "menuAction",
            choices: ["View All Departments", "View All Roles", "View All Employees", "View Employees by Manager", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Update Employee's Manager", "Exit"],
        }
    ],

    addDepartment: [
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "deptName"
        }
    ],

    addRole: function(rows) {
        return [
            {
                type: "input",
                message: "What is the title of the new role?",
                name: "newRoleTitle"
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
                type: "list",
                message: "What department does this role belong to?",
                name: "newRoleDept",
                choices: rows
            }
        ]
    },

    addEmployee: function(roles, managers) {
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
                type: "list",
                message: "What is the employee's role?",
                name: "newEmployeeRole",
                choices: roles
            },
            {
                type: "list",
                message: "What is the of the employee's manager?",
                name: "newEmployeeManager",
                choices: managers
            }
        ]
    },

    updateEmployee: function(employees, roles) {
        return [
            {
                type: "list",
                message: "Which employee's role would you like to update?",
                name: "updateEmployee",
                choices: employees
            },
            {
                type: "list",
                message: "What is the employee's new role?",
                name: "updateRole",
                choices: roles
            }
        ]
    },

    updateManager: function(employees, manager) {
        return [
            {
                type: "list",
                message: "Which employee's manager would you like to update?",
                name: "updateManager",
                choices: employees
            },
            {
                type: "list",
                message: "Who is the employee's new manager?",
                name: "newManager",
                choices: manager
            }
        ]
    },

    viewByMgr: function(manager) {
        return [
            {
                type: "list",
                message: "Which manager would you like to search by?",
                name: "managerView",
                choices: manager
            }
        ]
    },
    }

module.exports = questions;