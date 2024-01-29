require('dotenv').config()
const {
  HOUR_IN_SECONDS,
  TWELVE_HOURS_IN_SECONDS,
} = require('./constants')

module.exports = {
  PRODUCTION: process.env.NODE_ENV === 'production',
  PORT: process.env.PORT || 3000,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  NGROK_TOKEN: process.env.NGROK_TOKEN,
  NGROK_STATIC_DOMAIN: process.env.NGROK_STATIC_DOMAIN,
  ORGANIZATION: process.env.ORGANIZATION,
  REPOSITORY: process.env.REPOSITORY,
  LOGS_PATH: process.env.LOGS_PATH || './logs',
  CACHE_URL: process.env.CACHE_URL,
  ISSUES_CACHE_EXPIRE_IN_S: parseInt(
    process.env.ISSUES_CACHE_EXPIRE_IN_S || HOUR_IN_SECONDS
  ),
  MEMBERS_CACHE_EXPIRE_IN_S: parseInt(
    process.env.MEMBERS_CACHE_EXPIRE_IN_S || TWELVE_HOURS_IN_SECONDS
  ),
}
