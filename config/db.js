
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config

const connection = mysql.createConnection({

    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USERS,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,

});

connection.connect((error) => {
    if (error) throw error;
    console.log("Database Connected Successfully");
});


module.exports = connection;

