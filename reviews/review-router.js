const router = require('express').Router()

const Reviews = require('../data/helpers/review-model.js')

const verifyToken = require('../auth/verify-token.js')
const validateId = require('../middleware/validate-id.js')
const validateRating = require('./validate-rating.js')

router.use(verifyToken)

router.get('/', (req, res) => {
    Reviews.find()
        .then(reviews => {
            res.status(200).json(reviews)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error retrieving reviews.' })
        })
})

router.put('/:id', validateId('review'), validateRating, (req, res) => {
    const { id } = req.params
    const body = req.body

    Reviews.findById(id)
        .then(review => {
            // check if the review belongs to the client
            if (review.customer_id === Number(req.user.id)) {
                Reviews.update(id, body)
                    .then(() => {
                        Reviews.findById(id)
                            .then(review => {
                                res.status(201).json(review)
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({ message: 'Error finding review.' })
                            })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ message: 'Error updating review.' })
                    })
            } else {
                res.status(401).json({ message: 'You are not authorized to do this.' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error finding review.' })
        })
})

router.delete('/:id', validateId('review'), (req, res) => {
    const { id } = req.params

    Reviews.findById(id)
        .then(review => {
            // check if review belongs to client
            if (review.customer_id === Number(req.user.id)) {
                Reviews.remove(id)
                    .then(() => {
                        res.status(200).json({ message: 'Review successfully deleted.' })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ message: 'Error deleting review.' })
                    })
            } else {
                res.status(401).json({ message: 'You are not authorized to do this.' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error finding review.' })
        })
})

module.exports = router