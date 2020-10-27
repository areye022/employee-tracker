var mysql= require('mysql');
const fs = require("fs");
const inquirer = require("inquirer");
const util= require("util");
const cTable = require("console.table")

// mysql coinfiguration object
var connection = mysql.createConnection({
    // host is the location of your local server
    host: "localhost",
    port: 3306,
    user:"root",
    password:"FlyingMonkeys1!",
    database: "employees_db",
});

// to see all roles
function selectAllRoles(){
    connection.query("SELECT * FROM role", function(err,res){
        if (err) throw (err);
// console.logging the results from the songs table
        console.table(res);
        
    })
}


connection.connect(function(err){
    if (err) throw err;

    console.log(`connected as id ${connection.threadId}`);
    // selectAllRoles();
    selectAllRoles();
    connection.end();
})