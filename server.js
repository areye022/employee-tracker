const fs = require("fs");
const inquirer = require("inquirer");
const cTable = require("console.table");

// classes
const Queries = require("./classes/queries");
const connection= require("./connection")

// currently only one function is prompting
// to see all roles
// function viewRoles(){
//     connection.query("SELECT * FROM role", function(err, res){
//         if (err) throw (err);
// // console.logging the results from the songs table
//         console.table(res);
//     })
// }

// // to see departments 
async function viewDepartments(){
    // var departments = await Queries.getDepartment();
                console.table(connection.query("SELECT * FROM department"));
    }


// // to see employees table
// function viewEmployees(){
//     connection.query("SELECT * FROM employee"), function (err, res){
//         if (err) throw(err);
//         console.table(res);
//     }
// }

async function updateTracker(){
    const { toDo } = await inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "toDo",
            choices:["view departments","add department"]
        }
    ])
        switch (toDo) {
            case "view departments":
// OR CALL FUNCTION, BUT NOT WORKING PROPERLY
connection.query("SELECT * FROM department", function(err,res){
    console.table(res);
})
            case "add department":
                inquirer.prompt([
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

    }
}

updateTracker();

// connection.connect(function(err){
//     if (err) throw err;

//     console.log(`connected as id ${connection.threadId}`);
//     // viewRoles();
//     // viewDepartments();
//     // viewEmployees();
//     updateTracker();
//     connection.end();
// })