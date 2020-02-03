const router = require('express').Router()

const Users = require('../data/helpers/user-model.js')

const verifyToken = require('../auth/verify-token.js')

router.use(verifyToken)

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error retrieving users.' })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Users.findById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Error retrieving user.' })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    if (Number(id) === Number(req.user.id)) {
        Users.remove(id)
            .then(() => {
                res.status(200).json({ message: 'User successfully deleted.' })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'Error deleting user.' })
            })
    } else {
        res.status(401).json({ message: 'You do not have authorization to do this.' })
    }
})

module.exports = router