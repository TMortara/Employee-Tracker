const questions = {
    menu: [
        {
            type: "list",
            message: "What would you like to do?",
            name: "menuAction",
            choices: ["View All Departments",
                "View All Roles",
                "View All Employees",
                "View Employees by Manager",
                "View Employees by Department",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Role",
                "Update Employee's Manager",
                "Delete Employee",
                "Delete Role",
                "Delete Department",
                "Exit"],
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
        managers.push({
            name: "None",
            value: null
        });

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

    updateManager: function(employees, managers) {
        manager.push({
            name: "None",
            value: null
        });
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
                choices: managers
            }
        ]
    },

    viewByMgr: function(managers) {
        return [
            {
                type: "list",
                message: "Which manager would you like to search by?",
                name: "managerView",
                choices: managers
            }
        ]
    },

    viewByDept: function(departments) {
        return [
            {
                type: "list",
                message: "Which department would you like to search by?",
                name: "deptView",
                choices: departments
            }
        ]
    },

    deleteEmployee: function(employees) {
        return [
            {
                type: "list",
                message: "Which employee would you like to delete?",
                name: "deleteEmployee",
                choices: employees
            }
        ]
    },

    deleteRole: function(roles) {
        return [
            {
                type: "list",
                message: "Which role would you like to delete?",
                name: "deleteRole",
                choices: roles
            }
        ]
    },

    deleteDept: function(departments) {
        return [
            {
                type: "list",
                message: "Which department would you like to delete?",
                name: "deleteDept",
                choices: departments
            }
        ]
    },
    }

module.exports = questions;