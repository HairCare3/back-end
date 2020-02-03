const router = require('express').Router()

const Users = require('../data/helpers/user-model.js')
const Photos = require('../data/helpers/photo-model.js')
const Reviews = require('../data/helpers/review-model.js')

const verifyToken = require('../auth/verify-token.js')
const validateId = require('../middleware/validate-id.js')

router.use(verifyToken)

router.get('/', (req, res) => {
    Users.findStylists()
        .then(stylists => {
            res.status(200).json(stylists)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error retrieving stylists.' })
        })
})

router.get('/:id', validateId('user'), (req, res) => {
    const { id } = req.params

    Photos.findByUser(id)
        .then(photos => {
            Users.findById(id)
                .then(stylist => {
                    // check if the id belongs to a stylist
                    if (stylist.is_stylist) {
                        res.status(200).json({
                            ...stylist,
                            photos: photos
                        })
                    } else {
                        res.status(400).json({ message: 'This user is not a stylist.' })
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ message: 'Error retrieving stylist.' })
                })
    })
})

router.post('/:id', validateId('user'), (req, res) => {
    const { id } = req.params
    const body = {
        ...req.body,
        stylist_id: id,
        customer_id: req.user.id
    }
    
    // check if the client's id is the same as the stylist id
    if (id === Number(req.user.id)) {
        res.status(400).json({ message: 'You cannot review yourself.' })
    } else {
        Users.findById(id)
            .then(stylist => {
                // check if the id belongs to a stylist
                if (stylist.is_stylist) {
                    Reviews.add(body)
                        .then(() => {
                            res.status(201).json({ message: 'Review successfully added.' })
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).json({ message: 'Error adding review.' })
                        })
                } else {
                    res.status(400).json({ message: 'This user is not a stylist.' })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'Error retrieving stylist.' })
            })
    }
})

module.exports = router