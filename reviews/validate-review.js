function validateReview(req, res, next) {
    const body = req.body

    if (Object.keys(body).length === 0) {
        res.status(400).json({ message: 'Missing review data.' })
    } else if (!body.text) {
        res.status(400).json({ message: 'Review text is required.' })
    } else if (!body.stylist_rating) {
        res.status(400).json({ message: 'Stylist rating is required.' })
    } else if (!body.haircut_rating) {
        res.status(400).json({ message: 'Haircut rating is required.' })
    } else if (Number(body.stylist_rating) < 1 || Number(body.styling_rating) > 5 || Number(body.haircut_rating) < 1 || Number(body.haircut_rating) > 5) {
        res.status(400).json({ message: 'Rating must be no lower than 1 and no higher than 5.' })
    } else {
        next()
    }
}

module.exports = validateReview