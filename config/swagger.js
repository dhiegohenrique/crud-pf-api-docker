const config = require('./config')()
let host = `localhost:${config.port}`
let schemes = ['http']
if (config.env === 'production') {
  host = 'crud-pf-api-docker.herokuapp.com'
  schemes = ['https']
}

exports.options = {
  routePrefix: '/documentation',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'CRUD Pessoa Física API',
      description: 'CRUD para manter cadastros de pessoas físicas com seus dados, endereços e contatos.',
      version: '1.0.0'
    },
    host,
    schemes,
    consumes: ['application/json'],
    produces: ['application/json'],
    servers: [
      {
        url: 'http://api.example.com/v1',
        description: 'Optional server description, e.g. Main (production) server'
      }
    ]
  }
}
