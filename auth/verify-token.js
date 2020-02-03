const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/secrets.js')

function verifyToken(req, res, next) {
    const token = req.headers.authorization

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            console.log(err)
            res.status(401).json({ message: 'You must be logged in to do this.' })
        } else {
            req.user = decoded
            next()
        }
    })
}

module.exports = verifyToken