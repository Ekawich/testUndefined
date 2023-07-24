const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('../utils/jwt')
const moment = require('../utils/moment')

const register = async (req, res) => {
    const { username, password } = req.body

    try {
        // Check if the username is exists
        const existingUser = await users.findUsername(username)
        if (existingUser) {
            return res.status(400).json({ status: 400, message: 'User already exists' })
        }

        // Hash the password
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const currentDate = await moment.getDateTimeNow()

        // create new user
        const newUser = {
            username,
            password: hashedPassword,
            currentDate
        }

        const userId = await users.createUser(newUser)
        res.status(200).json({ status: 200, message: 'User has been created' })
    } catch (err) {
        console.error('Error Register', err)
        res.status(400).json({ message: 'Internal server error' })
    }
}

// API Login
const login = async (req, res) => {
    const { username, password } = req.body

    try {
        // Find the user
        const user = await users.findUsername(username)
        if (!user) {
            res.status(404).json({ status: 404, message: "User not found" })
            return
        }

        // Check password
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            res.status(401).json({ status: 401, message: "Invalid username or password" })
            return
        }

        const token = jwt.generateToken({ userId: user.id })
        const userData = {
            id: user.id,
            username: user.username,
        }
        res.status(200).json({ status: 200, message: "Login success!", user: userData, token })
    } catch (err) {
        console.error(err)
        res.status(500).json({ status: 500, message: 'Internal server error' })
    }
}

module.exports = {
    register,
    login
}
