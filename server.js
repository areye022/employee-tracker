var mysql= require('mysql');
// create variables necessary for readme generator
const fs = require("fs");
// need to install inquirer
const inquirer = require("inquirer");
const util= require("util");

// mysql coinfiguration object
var connection = mysql.createConnection({
    // host is the location of your local server
    host: "localhost",
    port: 3306,
    user:"root",
    password:"FlyingMonkeys1!",
    database: "employee_trackerdb",
});


connection.connect(function(err){
    if (err) throw err;

    console.log(`connected as id ${connection.threadId}`);
    // selectAllRoles();
    
    connection.end();
})