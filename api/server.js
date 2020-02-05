const express = require('express')

const apiRouter = require('./api-router.js')
const configMiddleware = require('../middleware/config-middleware.js')

const server = express()

configMiddleware(server)

server.use('/api', apiRouter)

server.get('/', (req, res) => {
    res.status(200).json({ api_status: 'up' })
})

module.exports = server