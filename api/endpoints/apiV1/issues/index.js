const logger = require('../../../utils/logger')
const { getIssues } = require('../../../utils/git')
const validateQueryParams = require('../../../middlewares/validate_query_params')
const { calculateScore } = require('./issues_utils')
const { ISSUES_CACHE_EXPIRE_IN_S } = require('../../../utils/env')
const cache = require('../../../utils/cache_manager')
const sortData = require('../../../middlewares/sort')

const getIssuesEnpoint = async (req, res, next) => {
  try {
    const { sortBy, order, who } = req.query

    let issues = await cache.get_or_store(
      'issues',
      ISSUES_CACHE_EXPIRE_IN_S,
      async () => {
        const data = await getIssues()

        return data.map((issue) => ({
          title: issue.title,
          number: issue.number,
          created_at: issue.created_at,
          opener: issue.user.login,
          labels: issue.labels.map((label) => label.name),
          score: calculateScore(issue),
          url: issue.html_url,
          assignees: issue.assignees.map((assignee) => assignee.login),
        }))
      }
    )

    if (who) 
      issues = issues.filter((issue) => issue.assignees.includes(who))

    res.locals.data = issues
    res.locals.sortBy = sortBy || 'score'
    res.locals.order = order || 'desc'
    next()
  } catch (err) {
    logger.error(err)
    next(err)
  }
}

module.exports = async (app) => {
  app.get(
    '/issues',
    validateQueryParams(['sortBy', 'order', 'who']),
    getIssuesEnpoint,
    sortData
  )
}
