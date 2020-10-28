const fs = require("fs");
const inquirer = require("inquirer");
const cTable = require("console.table");

// classes
const Queries = require("./classes/queries");
const connection= require("./connection")

async function updateTracker(){
    const { toDo } = await inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "toDo",
            choices:["view departments","add department", "view employees", "add employee"]
        }
    ])
        switch (toDo) {
            case "view departments":
                connection.query("SELECT * FROM department", function(err,res){
                    console.table(res);
            })
            case "add department":
                await inquirer.prompt([
                    {
                        type:"input",
                        message:"what department would you like to add",
                        name:"departmentName"
                    }
                ]).then(res=>{
                    connection.query("INSERT INTO department (name) VALUES (?)", [res.departmentName], function(err,res2){
                        console.table(res2);
                    })
            })
            case "view employees":
                connection.query("SELECT * FROM employee", function(err,res){
                    console.table(res);
            })
            case "add employee":
                await inquirer.prompt([
                    {
                        type:"input",
                        message:"what is the new employees first name?",
                        name:"first_name"
                    },
                    {
                        type:"input",
                        message:"what is the new employees last name?",
                        name:"last_name"
                    },
                    {
                        type:"input",
                        message:"what is the new employees role id?",
                        name:"role_id"
                    }
                ]).then(res=>{
                    connection.query("INSERT INTO employee (first_name,last_name, role_id) VALUES (?,?,?)", [res.first_name, res.last_name, res.role_id], function(err,res2){
                        console.table(res2);
                    })
            })
    }
}

updateTracker();
