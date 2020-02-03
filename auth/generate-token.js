const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/secrets.js')

function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        is_stylist: user.is_stylist
    }

    const secret = jwtSecret

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secret, options)
}

module.exports = generateToken