const router = require('express').Router()

const Users = require('../data/helpers/user-model.js')
const Photos = require('../data/helpers/photo-model.js')

const verifyToken = require('../auth/verify-token.js')

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

router.get('/:id', (req, res) => {
    const { id } = req.params
    Photos.findByUser(id)
        .then(photos => {
            Users.findById(id)
                .then(stylist => {
                    console.log(stylist)
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

module.exports = router