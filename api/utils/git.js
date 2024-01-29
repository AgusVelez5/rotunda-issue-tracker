const { GITHUB_TOKEN, ORGANIZATION, REPOSITORY } = require('./env')
const axios = require('axios')

const baseUrl = 'https://api.github.com'

const getIssues = async () => {
  const { data } = await axios.get(
    `${baseUrl}/repos/${ORGANIZATION}/${REPOSITORY}/issues`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    }
  )

  return data
}

const getMembers = async () => {
  const { data } = await axios.get(
    `${baseUrl}/orgs/${ORGANIZATION}/members`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    }
  )
  return data
}

module.exports = {
  getIssues,
  getMembers,
}
