const ngrok = require('@ngrok/ngrok')

module.exports = (server) => {
  return () => {
    console.log('Shutting down gracefully...')

    server.close(async () => {
      console.log('Server closed.')

      await ngrok.disconnect()
      process.exit(0)
    })
  }
}
