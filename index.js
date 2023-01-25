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
                // viewEmployees();
                break;

            case "Add Department":
                // addDepartment();
                break;

            case "Add Role":
                // addRole();
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



// const addDepartment = async (db) => {
//     const data = await inquirer.prompt(questions.addDepartment);
//     console.log(data)
//     var query = `INSERT into department (name) VALUES ("${data.deptName}")`
//     console.log(query)
//     const [rows, fields] = await db.execute(query)
//     console.log(rows);
//     viewDepartment(db)

// }
// const addRole = async (db) => {
//     var query = `SELECT id AS value, name AS name FROM department`
//     var [rows, fields] = await db.execute(query)
//     console.log(rows)
//     var data = await inquirer.prompt(questions.addRole(rows))
//     console.log(data)
    // }

    
