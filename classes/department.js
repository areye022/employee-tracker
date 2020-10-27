const fs = require('fs');
const path = require('path');
const util= require("util");

class Department {
    constructor(id, name) {

        console.log("inside department");
        console.log(name);
        this.id = id;
        this.name = name;
        
    }
    getDepartment() {
        return connection.query("SELECT * FROM department", function(err,res){
            if (err) throw (err);
    // console.logging the results from the songs table
            console.table(res);
            
        })
    }
    getId(){
        return this.id;
    }
};


module.exports= Department
