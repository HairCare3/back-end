function validateUser(req, res, next) {
    const body = req.body

    if (Object.keys(body).length === 0) {
        res.status(400).json({ message: 'Missing user data.' })
    } else if (!body.username) {
        res.status(400).json({ message: 'Username is required.' })
    } else if (!body.password) {
        res.status(400).json({ message: 'Password is required.' })
    } else if (!body.email) {
        res.status(400).json({ message: 'Email is required.' })
    } else if (!body.name) {
        res.status(400).json({ message: 'Name is required.' })
    } else if (!body.location) {
        res.status(400).json({ message: 'Location is required.' })
    } else {
        next()
    }
}

module.exports = validateUser