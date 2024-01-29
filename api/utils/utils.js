const labelsConfig = require('../config/labels.json')
const { DEFAULT_PRIORITY_WEIGHTS } = require('./constants')

let PRIORITY_WEIGHTS = {
  ...(labelsConfig.labels),
}

// If there are no labels in the config file, use the default ones
if (Object.keys(PRIORITY_WEIGHTS).length === 0) {
  PRIORITY_WEIGHTS = DEFAULT_PRIORITY_WEIGHTS
}

function getDays(start, end) {
  const DAY_IN_MS = 1000 * 60 * 60 * 24
  return Math.round((end - start) / DAY_IN_MS)
}

function getLaboralsDays(start, end) {
  const days = getDays(start, end),
    laboralsDaysPerWeek = 5,
    restDaysPerWeek = 2,
    daysPerWeek = 7

  return ((days * laboralsDaysPerWeek - (start.getDay() - end.getDay()) * restDaysPerWeek) / daysPerWeek)
}

module.exports = {
  getDays,
  getLaboralsDays,
  PRIORITY_WEIGHTS,
  DEFAULT_WEIGHT: labelsConfig.defaultWeight || DEFAULT_PRIORITY_WEIGHTS['Mid Priority'],
}
