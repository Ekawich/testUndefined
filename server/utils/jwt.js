const jwt = require('jsonwebtoken')

const secretKey = "testNode"

const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' })
}

const veriftToken = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1]

    if (!token) {
        res.status(401).json({ status:401, message: 'Authorization token missing'})
    }

    try {
        const decoded = jwt.verify(token, secretKey)
        req.user = decoded
        next()
    } catch (err) {
        res.status(403).json({ status: 403, message: "Invalid token" })
    }
}

module.exports = {
    generateToken,
    veriftToken
}