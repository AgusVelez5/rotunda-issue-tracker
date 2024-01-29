const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const { PORT } = require('./utils/env')
const logRequest = require('./middlewares/log_request')
const notFoundHandler = require('./middlewares/not_found_handler')
const errorHandler = require('./middlewares/error_handler')
const shutdown = require('./utils/shutdown')
const ngrokSetup = require('./utils/ngrok')

const app = express()

app.use(compression())
app.use(helmet())
app.use(cors())
app.use(logRequest)

require('./docs/swagger')(app)
require('./endpoints/endpoints')(app)

app.use(notFoundHandler)
app.use(errorHandler)

if (process.env.NODE_ENV !== 'test') 
  ngrokSetup()

const server = app.listen(PORT, () =>
  console.log(`App started and is listening on ${PORT}`)
)

process.on('SIGTERM', shutdown(server))
process.on('SIGINT', shutdown(server))

// For testing purposes
module.exports = server