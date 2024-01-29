const { PORT, NGROK_TOKEN, NGROK_STATIC_DOMAIN } = require('./env')
const ngrok = require('@ngrok/ngrok')

module.exports = async () => {
  try {
    await ngrok.connect({
      authtoken: NGROK_TOKEN,
      addr: PORT,
      hostname: NGROK_STATIC_DOMAIN,
    })
  } catch (err) {
    console.log('An error occurred while initializing ngrok:', err)
  }
}
