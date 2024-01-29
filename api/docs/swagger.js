const express = require('express')
const path = require('path')
const swaggerUi = require('swagger-ui-express')
const v1Schema = require('./swagger.json')

module.exports = async (app) => {
  try {
    console.log('Initializing swagger docs...')

    app.use(
      '/public/favicon-32x32.png',
      express.static(path.join(__dirname, 'public/favicon-32x32.png'))
    )
    app.use(
      '/api/v1/docs',
      swaggerUi.serve,
      swaggerUi.setup(v1Schema, {
        customCss: '.topbar { display: none }',
        customSiteTitle: 'Rotunda Issue Tracker Docs',
        customfavIcon: '/public/favicon-32x32.png',
      })
    )

    console.log('Swagger docs initialized successfully 🎉')
  } catch (err) {
    console.log('An error occurred while initializing swagger docs:', err)
  }
}
