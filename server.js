const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
const cTable = require("console.table");
const questions = require("./utils/questions.js");


// Connect to database
const menu = async () => {
    const db = await mysql.createConnection(
        {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'employee_db'
        }
    );
    // var answers = await inquirer.prompt(questions.menu)
    // console.log(answers)

    //if (answers === )
    addDepartment(db)
    // viewDepartment(db)
}

const viewDepartment = async (db) => {
    var query = `SELECT * FROM department`
    console.log(query)
    const [rows, fields] = await db.execute(query)
    console.log(rows)
    // menu()
}


const addDepartment = async (db) => {
    const data = await inquirer.prompt(questions.addDepartment);
    console.log(data)
    var query = `INSERT into department (name) VALUES ("${data.deptName}")`
    console.log(query)
    const [rows, fields] = await db.execute(query)
    console.log(rows);
    viewDepartment(db)

}
const addRole = async (db) => {
    var query = `SELECT id AS value, name AS name FROM department`
    var [rows, fields] = await db.execute(query)
    console.log(rows)
    var data = await inquirer.prompt(questions.addRole(rows))
    console.log(data)
    }

menu()