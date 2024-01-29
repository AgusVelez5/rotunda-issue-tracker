const express = require('express')
const cache = require('../utils/cache_manager')
const { calculateScore } = require('./apiV1/issues/issues_utils')

const handleIssuesEvent = async (action, issue) => {
  if (action === 'opened') {
    const issues = await cache.get('issues')
    const fomatedIssue = {
      title: issue.title,
      number: issue.number,
      created_at: issue.created_at,
      opener: issue.user.login,
      labels: issue.labels.map((label) => label.name),
      score: calculateScore(issue),
      url: issue.html_url,
      assignees: issue.assignees.map((assignee) => assignee.login),
    }

    if (issues) {
      issues.push(fomatedIssue)
      await cache.store('issues', issues)
    }
  }

  if (action === 'closed') {
    let issues = await cache.get('issues')

    if (issues) {
      issues = issues.filter((obj) => obj.number !== issue.number)
      await cache.store('issues', issues)
    }
  }
}

const handleOrganizationEvent = async (action, user) => {
  // TODO: Handle other actions
  if (action === 'member_added') {
    const members = await cache.get('members')

    if (members) {
      members.push(user)
      await cache.store('members', members)
    }
  }
}

module.exports = async (app) => {
  app.post(
    '/git-webhook',
    express.json({ type: 'application/json' }),
    async (req, res) => {
      res.status(202).send('Accepted')

      const githubEvent = req.headers['x-github-event']
      const data = req.body
      const { action } = data

      if (githubEvent === 'issues') 
        await handleIssuesEvent(action, data.issue)

      if (githubEvent === 'organization')
        await handleOrganizationEvent(action, data.membership.user.login)
    }
  )
}
