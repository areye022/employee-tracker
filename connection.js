var mysql= require('mysql');
const util= require("util");

var connection = mysql.createConnection({
    // host is the location of your local server
    host: "localhost",
    port: 3306,
    user:"root",
    password:"FlyingMonkeys1!",
    database: "employees_db",
});

connection.query = util.promisify(connection.query);

connection.connect(function(err){
    if (err) throw err;

    console.log(`connected as id ${connection.threadId}`);
    
    // connection.end();
})

module.exports= connection