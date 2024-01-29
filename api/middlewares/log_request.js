const logger = require('../utils/logger')

module.exports = async (req, _, next) => {
  if (!req.path.match(/health_check/)) 
    logger.info(`${req.method} ${req.path}`)
  
  next()
}
