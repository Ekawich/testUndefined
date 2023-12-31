const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 8889,
    password: "root",
    database: "undefined"
})

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database", err)
        return
    }
    console.log('Connected to the database')
})

module.exports = db