const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

// custom middleware
const logger = require('./logger.js')

module.exports = server => {
    server.use(helmet())
    server.use(express.json())
    server.use(cors())
    server.use(logger)
}