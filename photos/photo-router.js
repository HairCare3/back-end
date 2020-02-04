const router = require('express').Router()

const Photos = require('../data/helpers/photo-model.js')

const verifyToken = require('../auth/verify-token.js')
const validateId = require('../middleware/validate-id.js')
const validatePhoto = require('./validate-photo.js')

router.use(verifyToken)

router.get('/', (req, res) => {
    Photos.find()
        .then(photos => {
            res.status(200).json(photos)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error retrieving photos.' })
        })
})

router.get('/:id', validateId('photo'), (req, res) => {
    const { id } = req.params

    Photos.find(id)
        .then(photo => {
            res.status(200).json(photo)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error retrieving photo.' })
        })
})

router.post('/', validatePhoto, (req, res) => {
    const body = {
        ...req.body,
        user_id: req.user.id
    }

    Photos.add(body)
        .then(() => {
            res.status(201).json({ message: 'Photo successfully added.' })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error adding photo.' })
        })
})

router.put('/:id', validateId('photo'), validatePhoto, (req, res) => {
    const { id } = req.params
    const body = req.body

    Photos.findById(id)
        .then(photo => {
            if (photo.user_id === Number(req.user.id)) {
                Photos.update(id, body)
                    .then(() => {
                        Photos.findById(id)
                            .then(photo => {
                                res.status(201).json(photo)
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({ message: 'Error finding photo.' })
                            })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ message: 'Error updating photo.' })
                    })
            } else {
                res.status(401).json({ message: 'You are not authorized to do this.' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error finding photo.' })
        })
})

router.delete('/:id', validateId('photo'), (req, res) => {
    const { id } = req.params

    Photos.findById(id)
        .then(photo => {
            if (photo.user_id === Number(req.user.id)) {
                Photos.remove(id)
                    .then(() => {
                        res.status(200).json({ message: 'Photo successfully deleted.' })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ message: 'Error deleting photo.' })
                    })
            } else {
                res.status(401).json({ message: 'You are not authorized to do this.' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error finding photo.' })
        })
})

module.exports = router