function validatePhoto(req, res, next) {
    const body = req.body

    if (!body.img_url) {
        res.status(400).json({ message: 'An image URL is required.' })
    } else {
        next()
    }
}

module.exports = validatePhoto