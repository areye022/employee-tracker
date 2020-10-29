const fs = require('fs');
const path = require('path');
const util= require("util");
const connection= require("../connection")

// one class with all queries to represent all tables 
class Queries {
    constructor(connection) {
        // this class represents the connection to the database

        console.log("inside queries");
        
        this.connection = connection;
        
    }
    getDepartment() {
        return this.connection.query("SELECT * FROM department",function(err,res){
            console.table(res);
        })
    }

};


module.exports= Queries
