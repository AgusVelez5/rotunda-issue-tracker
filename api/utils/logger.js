const winston = require('winston')
const path = require('path')
const { LOGS_PATH, PRODUCTION } = require('./env')

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.join(LOGS_PATH, 'error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(LOGS_PATH, 'combined.log'),
      level: 'info',
    }),
  ],
})

logger.error = (err) => {
  if (err instanceof Error) {
    logger.log({ level: 'error', message: err.stack || err })
  } else {
    logger.log({ level: 'error', message: err })
  }
}

if (!PRODUCTION) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  )
}

const fakeLogger = {
  error: () => {},
  info: () => {},
  warn: () => {},
  log: () => {},
}

module.exports = process.env.NODE_ENV === 'test' ? fakeLogger : logger
