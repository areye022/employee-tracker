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
            choices:["view departments","add department", "view employees",
            "add employee", "view roles", "add roles","update role","quit"]
        }
    ])
        switch (toDo) {
            case "view departments":
                connection.query("SELECT * FROM department", function(err,res){
                    console.table(res);
                    // when I use update tracker, it will not wait allow the inquirer prompts to be answered
                    // because it immediately calls on the update tracker prompts 
                    break;
                        updateTracker();
            })
            // whenever I choose the add department section, the view employees section is shown in the CL
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
            });
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
                        message:"what is their role's id?",
                        name:"role_id"
                    },
                    {
                        type:"input",
                        message:"what is their manager's id?",
                        name:"manager_id"
                    },
                    
                ]).then(res=>{
                    console.log(res);
                    connection.query("INSERT INTO employee (first_name,last_name, role_id, manager_id) VALUES (?,?,?,?)",
                    [res.first_name, res.last_name, res.role_id, res.manager_id], function(err,res2){
                        console.log(res2);
                        
                        // console.table(res2);
                    })
            })
            case "view roles":
                connection.query("SELECT * FROM role", function(err,res){
                    console.table(res);
                    
            })
            case "add roles":
                await inquirer.prompt([
                    {
                        type:"input",
                        message:"what role would you like to add?",
                        name:"title"
                    },
                    {
                        type:"input",
                        message:"what is the salary for this role?",
                        name:"salary"
                    },
                    {
                        type:"input",
                        message:"what is the department id?",
                        name:"department_id"
                    }
                ]).then(res=>{
                    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
                    [res.title,res.salary,res.department_id], function(err,res2){
                        console.table(res2);
                        
                    })
            })
            case "update role":
                updateRole();
            case "quit":
                console.log("Done updating our employee tracker!")
                break;
    };
};

async function updateRole(){
    const {update_role} =await inquirer.prompt([
        {
            type:"list",
            message: "What paramater within roles would you like to update?",
            name: "update_role",
            choices: ["update title", "update salary","update department id"]
        }
    ]) 
    switch (update_role){
        case "update title":
            inquirer.prompt([
                {
                    type:"input",
                    message:"which primary key would you like to change?",
                    name:"id",
                },
                {
                    type:"input",
                    message:"what will the new role title be?",
                    name:"newTitle"
                }
            ]).then(res=>{
                console.log(res);
                connection.query("UPDATE role SET title = ? WHERE id = ? ",
                [res.newTitle,res.id], function(err, res2){
                    console.log(res2);
                })
            })
        case "update salary":
            inquirer.prompt([
                {
                    type:"input",
                    message:"which primary key would you like to change?",
                    name:"id",
                },
                {
                    type:"input",
                    message:"what will the new salary be?",
                    name:"newSalary"
                }
            ]).then(res=>{
                console.log(res);
                connection.query("UPDATE role SET salary = ? WHERE id = ? ",
                [res.newSalary,res.id], function(err, res2){
                    console.log(res2);
                })
            })
            case "update department id":
            inquirer.prompt([
                {
                    type:"input",
                    message:"which primary key would you like to change?",
                    name:"id",
                },
                {
                    type:"input",
                    message:"what will the new department id be?",
                    name:"newDepId"
                }
            ]).then(res=>{
                console.log(res);
                connection.query("UPDATE role SET department_id = ? WHERE id = ? ",
                [res.newDepId,res.id], function(err, res2){
                    console.log(res2);
                })
            })
            
    }
}

updateTracker();
// Queries.getDepartment();
