function validateCredentials(req, res, next) {
    const body = req.body

    if (Object.keys(body).length === 0) {
        res.status(400).json({ message: 'Missing user credentials.' })
    } else if (!body.username) {
        res.status(400).json({ message: 'Username is required.' })
    } else if (!body.password) {
        res.status(400).json({ message: 'Password is required.' })
    } else {
        next()
    }
}

module.exports = validateCredentials