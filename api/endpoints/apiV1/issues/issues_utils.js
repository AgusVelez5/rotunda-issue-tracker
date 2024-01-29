const { getLaboralsDays, PRIORITY_WEIGHTS, DEFAULT_WEIGHT } = require('../../../utils/utils')

function calculateScore(issue) {
  let priorityWeight = 0
  for (const label of issue.labels)
    if (PRIORITY_WEIGHTS[label.name]) {
      priorityWeight = PRIORITY_WEIGHTS[label.name]
      break
    }

  const laboralsDays = getLaboralsDays(new Date(issue.created_at), new Date())
  return (priorityWeight || DEFAULT_WEIGHT) * (laboralsDays || 1)
}

module.exports = {
  calculateScore,
}
