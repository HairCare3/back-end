const router = require('express').Router()

const Users = require('../data/helpers/user-model.js')
const Photos = require('../data/helpers/photo-model.js')
const Reviews = require('../data/helpers/review-model.js')

const verifyToken = require('../auth/verify-token.js')
const validateId = require('../middleware/validate-id.js')

router.use(verifyToken)

// array of all stylists
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

// get a stylist, returns a user object with photo and review arrays added
router.get('/:id', validateId('user'), (req, res) => {
    const { id } = req.params

    Users.findById(id)
        .then(stylist => {
            // check if the id belongs to a stylist
            if (stylist.is_stylist) {
                // get stylist's photos
                Photos.findByStylist(id)
                    .then(photos => {
                        Reviews.findByStylist(id)
                            .then(reviews => {
                                // add stored photos and reviews to the stylist object
                                res.status(200).json({
                                    ...stylist,
                                    photos: photos,
                                    reviews: reviews
                                })
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({ message: 'Error retrieving reviews.' })
                            })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ message: 'Error retrieving photos.' })
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

// post a review for the given stylist
router.post('/:id', validateId('user'), (req, res) => {
    const { id } = req.params
    const body = req.body

    const reviewBody = {
        title: body.title,
        text: body.text,
        stylist_rating: body.stylist_rating,
        haircut_rating: body.haircut_rating,
        stylist_id: id,
        customer_id: req.user.id
    }

    // check if the client's id is the same as the stylist id
    if (Number(id) !== Number(req.user.id)) {
        Users.findById(id)
            .then(stylist => {
                // check if the id belongs to a stylist
                if (stylist.is_stylist) {
                    // check if the review includes a photo
                    if (body.img_url) {
                        const photoBody = {
                            img_url: body.img_url,
                            description: body.img_description,
                            user_id: req.user.id,
                            review_photo: true
                        }

                        // first add photo to database
                        Photos.add(photoBody)
                            .then(() => {
                                Photos.findByUrl(photoBody.img_url)
                                    .then(photo => {
                                        // then include the photo id in the review
                                        Reviews.add({ ...reviewBody, photo_id: photo.id })
                                            .then(() => {
                                                res.status(201).json({ message: 'Review successfully added.' })
                                            })
                                            .catch({ message: 'Error adding review.' })
                                    })
                                    .catch({ message: 'Error retrieving photo.' })
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({ message: 'Error adding photo.'})
                            })
                    } else {
                        // if the review doesn't include a photo
                        Reviews.add(reviewBody)
                            .then(() => {
                                res.status(201).json({ message: 'Review successfully added.' })
                            })
                            .catch({ message: 'Error adding review.' })                        
                    }
                } else {
                    res.status(400).json({ message: 'This user is not a stylist.' })
                }
            })
    } else {
        res.status(400).json({ message: 'You cannot review yourself.' })
    }
})

router.get('/:id/photos', validateId('user'), (req, res) => {

})

module.exports = router