module.exports = (app) => {
  app.get('/health_check', (_, res) => res.sendStatus(200))
}
