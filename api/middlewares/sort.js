const logger = require('../utils/logger')

module.exports = (_, res, next) => {
  try {
    const { sortBy, order, data } = res.locals

    // TODO: Handle other types of data
    data.sort((x, y) => {
      if (x[sortBy] > y[sortBy]) 
        return order === 'asc' ? 1 : -1
      if (x[sortBy] < y[sortBy]) 
        return order === 'asc' ? -1 : 1
      return 0
    })

    return res.send(data)
  } catch (err) {
    logger.error(err)
    next(err)
  }
}
