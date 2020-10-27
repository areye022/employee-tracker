var mysql= require('mysql');
const fs = require("fs");
const inquirer = require("inquirer");
const util= require("util");
const cTable = require("console.table")

// classes
const Department = require("./classes/department");

// output tables
var department = [];

// mysql coinfiguration object
var connection = mysql.createConnection({
    // host is the location of your local server
    host: "localhost",
    port: 3306,
    user:"root",
    password:"FlyingMonkeys1!",
    database: "employees_db",
});

// currently only one function is prompting
// to see all roles
function viewRoles(){
    connection.query("SELECT * FROM role", function(err, res){
        if (err) throw (err);
// console.logging the results from the songs table
        console.table(res);
    })
}

// to see departments 
function viewDepartments(){
    connection.query("SELECT * FROM department"), function (err, res){
        if (err) throw(err);
        console.table(res);
    }
}

// to see employees table
function viewEmployees(){
    connection.query("SELECT * FROM employee"), function (err, res){
        if (err) throw(err);
        console.table(res);
    }
}

// const updateTracker=() =>{
//     inquirer.prompt([
//         {
//             type: "list",
//             message: "What would you like to do?",
//             name: "toDo",
//             choices:["view departments"]
//         }
//     ]).then(res =>{
//         const { toDo } = res;
//         switch (toDo) {
//             case "view departments":
// OR CALL FUNCTION, BUT NOT WORKING PROPERLY
//                     connection.query("SELECT * FROM department", function(err,res){
//                             if (err) throw (err);
//                     // console.logging the results from the songs table
//                             console.table(res);
                            
//                         })
//                     }
                    
//         }).then(res =>{
//         getDepartment();
//     })
// }


connection.connect(function(err){
    if (err) throw err;

    console.log(`connected as id ${connection.threadId}`);
    // viewRoles();
    // viewDepartments();
    viewEmployees();
    // updateTracker();
    connection.end();
})