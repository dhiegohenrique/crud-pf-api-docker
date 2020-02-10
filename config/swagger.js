const config = require('./config')()

exports.options = {
  routePrefix: '/documentation',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'CRUD Pessoa Física API',
      description: 'CRUD para manter cadastros de pessoas físicas com seus dados, endereços e contatos.',
      version: '1.0.0'
    },
    host: `localhost:${config.port}`,
    schemes: ['http'],
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
