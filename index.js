const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const questions = require("./utils/questions.js");
const { viewEmployeesByMgr } = require("./utils/questions.js");
const dotenv = require("dotenv").config();

// // Connect to database
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: process.env.MYSQL_PASSWORD,
        database: 'employee_db'
    }
);

db.connect((err) => {
    if (err) throw err;
    console.log("You are now connected to the employee database!");

    init();
});

// Start function
function init(){
    inquirer.prompt(questions.menu).then((action) => {
        switch (action.menuAction) {
            case "View All Departments":
                viewDepartment();
                break;

            case "View All Roles":
                viewRoles();
                break;
            
            case "View All Employees":
                viewEmployees();
                break;

            case "View Employees by Manager":
                viewByMgr();
                break;
            
            case "View Employees by Department":
                viewByDept();
                break;

            case "View Department Budget":
                deptBudget();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Update Employee Role":
                updateEmployee();
                break;

            case "Update Employee's Manager":
                updateManager();
                break;

            case "Delete Employee":
                deleteEmployee();
                break;

            case "Delete Role":
                deleteRole();
                break;

            case "Delete Department":
                deleteDept();
                break;

            case "Exit":
                quit();
                break;
        }
    });
}

// VIEW FUNCTIONS:

// View all departments
function viewDepartment() {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.table(results);
        init();
    });
}

// View all roles
function viewRoles() {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.table(results);
        init();
    });
}

//View all employees
function viewEmployees() {
    const queryString = `SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager 
    FROM employee AS e 
    JOIN role AS r ON r.id = e.role_id 
    JOIN department AS d ON d.id = r.department_id 
    LEFT JOIN employee AS e2 ON e2.id = e.manager_id
    ORDER BY e.id`;

    db.query(queryString, function (err, results) {
        console.table(results);
        init();
    });
}

// ADD FUNCTIONS

// Add new department
function addDepartment() {    
    inquirer.prompt(questions.addDepartment).then(data =>
        {
        db.query(`INSERT INTO department (name) VALUES (?)`, [data.deptName], function (err, results) {
            // console.table(results);
            console.log(`${data.deptName} SUCCESSFULLY created`);
            viewDepartment();
        });
        });
}

// Add new role
function addRole() {    
    db.query('SELECT name, id AS value FROM department', function (err, results) {
        inquirer.prompt(questions.addRole(results)).then(data => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [data.newRoleTitle, data.newRoleSalary, data.newRoleDept], function (err, results) {
                console.log(`${data.newRoleTitle} SUCCESSFULLY created`);
            
                viewRoles();
            });
        });
    });
}

// Add new employee
function addEmployee() {
    db.query('SELECT title AS name, id AS value FROM role', function (err, roleResults) {
        db.query("SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employee", function (err, managerResults) {
           inquirer.prompt(questions.addEmployee(roleResults, managerResults)).then(data => {
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [data.newEmployeeFN, data.newEmployeeLN, data.newEmployeeRole, data.newEmployeeManager], function (err, results){
                    console.log(`${data.newEmployeeFN} ${data.newEmployeeLN} SUCCESSFULLY created`);
                    
                    viewEmployees();
                });
           });
        });
    });
}

// UPDATE FUNCTION

// Update employee's role
function updateEmployee() {
    db.query("SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employee", function (err, employeeResults) {
        db.query('SELECT title AS name, id AS value FROM role', function (err, roleResults) {
            inquirer.prompt(questions.updateEmployee(employeeResults, roleResults)).then(data => {
                db.query('UPDATE employee SET role_id  = ? WHERE id = ?', [data.updateRole, data.updateEmployee], function (err, results) {
                    console.log("Employee's role has been SUCCESSFULLY updated!");
                    
                    viewEmployees();
                });
            });
        });
    });
}

// BONUS FUNCTIONS

// Update employees manager
function updateManager() {
    db.query("SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employee", function (err, employeeResults) {
        db.query("SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employee", function (err, managerResults) {
            inquirer.prompt(questions.updateManager(employeeResults, managerResults)).then(data => {
                db.query('UPDATE employee SET manager_id = ? WHERE id = ?', [data.newManager, data.updateManager], function (err, results) {
                    console.log("Employee's manager has been SUCCESSFULLY updated!");

                    viewEmployees();
                });
            });
        });
    });
}

// View employees by manager
function viewByMgr() {
    const managerQuery = "SELECT DISTINCT CONCAT(e2.first_name, ' ', e2.last_name) AS name, e2.id AS value FROM employee AS e LEFT JOIN employee AS e2 ON e.manager_id = e2.id WHERE e2.id IS not null"
    db.query(managerQuery, function (err, managerResults) {
            inquirer.prompt(questions.viewByMgr(managerResults)).then(data => {
                db.query("SELECT * FROM employee WHERE manager_id = ?", [data.managerView], function (err, employeeResults) {
                console.table(employeeResults);

                init();
            });
        });
   });
}

// View employees by department
function viewByDept() {
    db.query('SELECT name, id AS value FROM department', function (err, deptResults) {
        inquirer.prompt(questions.viewByDept(deptResults)).then(data => {
            db.query(`SELECT CONCAT(e.first_name, ' ', e.last_name) AS employee_name, r.title, d.name AS department_name 
            FROM employee AS e 
            JOIN role AS r ON e.role_id = r.id 
            JOIN department AS d ON d.id = r.department_id 
            WHERE r.department_id = ?`, [data.deptView], function (err, employeeResults) {
                if (employeeResults.length > 0) {
                    console.table(employeeResults);
                } else {
                    console.log("No employee's found in this department");
                }
            init();
            });
        });
    });
}

// Delete employee
function deleteEmployee() {
    db.query("SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employee", function (err, employeeResults) {
        inquirer.prompt(questions.deleteEmployee(employeeResults)).then(data => {
            db.query("UPDATE employee SET manager_id = null WHERE manager_id = ?", [data.deleteEmployee], function (err, updateResults) {
                db.query("DELETE FROM employee WHERE id = ?", [data.deleteEmployee], function (err, deleteResults) {
                    
                    viewEmployees();
                });
            });
        });
    });
}

// Delete role
function deleteRole() {
    db.query('SELECT title AS name, id AS value FROM role', function (err, roleResults) {
        inquirer.prompt(questions.deleteRole(roleResults)).then(data => {
            db.query("DELETE FROM role WHERE id = ?", [data.deleteRole], function (err, deleteResults) {

                viewRoles();
            });
        });
    });
}

// Delete department
function deleteDept() {
    db.query('SELECT name, id AS value FROM department', function (err, deptResults) {
        inquirer.prompt(questions.deleteDept(deptResults)).then(data => {
            db.query('DELETE FROM department WHERE id = ?', [data.deleteDept], function (err, deleteResults) {
                
                viewDepartment();
            });
        });
    });
}

// View selected department budget
function deptBudget() {
    db.query('SELECT name, id AS value FROM department', function (err, deptResults) {
        inquirer.prompt(questions.deptBudget(deptResults)).then(data => {
            db.query(`SELECT d.name, SUM(r.salary) AS total 
            FROM department AS d 
            JOIN role AS r ON r.department_id = d.id 
            JOIN employee AS e ON e.role_id = r.id 
            WHERE d.id = ?`, [data.viewBudget], function (err, salaryResults) {
                
                console.table(salaryResults);
                init();
            });

        });
    });
}


// End connection
function quit() {
    console.log ("Your session has ended.");
    db.end();
}