const router = require('express').Router()

const authRouter = require('../auth/auth-router.js')
const userRouter = require('../users/user-router.js')
const stylistRouter = require('../users/stylist-router.js')
const photoRouter = require('../photos/photo-router.js')

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/stylists', stylistRouter)
router.use('/photos', photoRouter)

module.exports = router