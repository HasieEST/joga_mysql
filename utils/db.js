// setup database connection
const mysql = require('mysql')
// create database connection

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
})

module.exports = db