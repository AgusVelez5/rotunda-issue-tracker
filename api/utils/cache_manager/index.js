const { PRODUCTION, CACHE_URL } = require('../env')
const CacheManager = PRODUCTION ? require('./cache_manager') : require('./dev_cache_manager')

module.exports = new CacheManager(CACHE_URL)
