const githubWebhookEndpoint = require('./github_webhook')
const healthCheckEndpoint = require('./health_check')
const apiV1Router = require('./apiV1/api')

module.exports = app => {
  healthCheckEndpoint(app)
  githubWebhookEndpoint(app)

  app.use('/api/v1', apiV1Router)
}
