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
                // addEmployee();
                break;

            case "Update Employee Role":
                // updateEmployee();
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
        db.query(`INSERT into department (name) VALUES ("${data.deptName}")`, function (err, results) {
            // console.table(results);
            console.log(`${data.deptName} SUCCESSFULLY created`);
            init();
        });
        })

}

// const addRole = async (db) => {
//     var query = `SELECT id AS value, name AS name FROM department`
//     var [rows, fields] = await db.execute(query)
//     console.log(rows)
//     var data = await inquirer.prompt(questions.addRole(rows))
//     console.log(data)
    // }

function addRole() {    
    inquirer.prompt(questions.addRole()).then(data => {
        db.query(`INSERT into department (name) VALUES ("${data.deptName}")`, function (err, results) {
            // console.table(results);
            console.log(`${data.deptName} SUCCESSFULLY created`);
      
            init();
        });
        console.log(data);
    })

}
    
