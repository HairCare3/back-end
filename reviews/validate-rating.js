function validateRating(req, res, next) {
    const body = req.body

    if (Number(body.stylist_rating) < 1 || Number(body.styling_rating) > 5 || Number(body.haircut_rating) < 1 || Number(body.haircut_rating) > 5) {
        res.status(400).json({ message: 'Rating must be no lower than 1 and no higher than 5.' })
    } else {
        next()
    }
}

module.exports = validateRating