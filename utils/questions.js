// Prompt questions for all functions
const questions = {
    // Main menu prompts
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
                "View Department Budget",
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
    // Add new department
    addDepartment: [
        {
            type: "input",
            message: "What is the name of the new department?",
            name: "deptName"
        }
    ],
    // Add new role
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
            },
            {
                type: "list",
                message: "What department does this role belong to?",
                name: "newRoleDept",
                choices: rows
            }
        ]
    },
    // Add new employee
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
    //Update employees role
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
//BONUS SECTION:
    // Update employees manager
    updateManager: function(employees, managers) {
        managers.push({
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
// View all employees by manager
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
// View all employees by department
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
// Delete selected employee
    deleteEmployee: function(employees) {
        employees.push({
            name: "Cancel",
            value: null
        });
        return [
            {
                type: "list",
                message: "Which employee would you like to delete?",
                name: "deleteEmployee",
                choices: employees
            }
        ]
    },
// Delete selected role
    deleteRole: function(roles) {
        roles.push({
            name: "Cancel",
            value: null
        });
        return [
            {
                type: "list",
                message: "Which role would you like to delete?",
                name: "deleteRole",
                choices: roles
            }
        ]
    },
// Delete selected department
    deleteDept: function(departments) {
        departments.push({
            name: "Cancel",
            value: null
        });
        return [
            {
                type: "list",
                message: "Which department would you like to delete?",
                name: "deleteDept",
                choices: departments
            }
        ]
    },
// Show budget for selected department
    deptBudget: function(departments) {
        return [
            {
                type: "list",
                message: "Which department would you like to view the total utilized budget?",
                name: "viewBudget",
                choices: departments
            }
        ]
    },
    }

module.exports = questions;