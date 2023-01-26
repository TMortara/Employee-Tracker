const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const questions = require("./utils/questions.js");
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
    console.log("connectedtodatabase");

    init();
});

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

            case "Exit":
                //quit()
                break;
        }
    });
}

function viewDepartment() {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.table(results);
        init();
    });
}

function viewRoles() {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.table(results);
        init();
    });
}

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

function updateEmployee() {
    db.query("SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employee", function (err, employeeResults) {
        db.query('SELECT title AS name, id AS value FROM role', function (err, roleResults){
            inquirer.prompt(questions.updateEmployee(employeeResults, roleResults)).then(data => {
                db.query('UPDATE employee SET role_id  = ? WHERE id = ?', [data.updateRole, data.updateEmployee], function (err, results) {
                    console.log("Employee's role has been SUCCESSFULLY updated!");
                    
                    viewEmployees();
                });
            });
        });
    });
}