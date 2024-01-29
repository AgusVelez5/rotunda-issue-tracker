const express = require('express')
const issuesEndpoint = require('./issues')
const membersEndpoint = require('./members')

const router = express.Router()

issuesEndpoint(router)
membersEndpoint(router)

module.exports = router
