const db = require('../utils/db')

const users = {
    findUsername: (username) => {
        return new Promise((resolve, reject) => {
             const query = "SELECT * FROM users WHERE username = ?"

             db.query(query, [username], (err, results) => {
                if (err) {
                    reject(err)
                    return
                }

                resolve(results[0])
             })
        })
    },

    createUser: (user) => {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users (username, password, create_at) VALUES (?, ?, ?)"

            db.query(query, [user.username, user.password, user.currentDate], (err, results) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(results.insertId)
            })
        })
    }
}

module.exports = users