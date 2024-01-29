const { MEMBERS_CACHE_EXPIRE_IN_S } = require('../../../utils/env')
const { getMembers } = require('../../../utils/git')
const logger = require('../../../utils/logger')
const cache = require('../../../utils/cache_manager')

module.exports = async (app) => {
  app.get('/members', async (_, res, next) => {
    try {
      const members = await cache.get_or_store(
        'members',
        MEMBERS_CACHE_EXPIRE_IN_S,
        async () => (await getMembers()).map(member => member.login)
      )

      res.send(members)
    } catch (err) {
      logger.error(err)
      next(err)
    }
  })
}
