const routes = require('./routes')
const swagger = require('./config/swagger')
const config = require('./config/config')()
let fastify

const initialize = async () => {
  try {
    fastify = require('fastify')({
      logger: true
    })

    fastify.register(require('fastify-swagger'), swagger.options)
    fastify.register(require('fastify-cors'), {
      origin: config.url_client
    })

    routes.forEach((route) => {
      fastify.route(route)
    })

    await fastify.listen(config.port, '0.0.0.0')
    fastify.swagger()
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    if (fastify) {
      fastify.log.error(err)
    }
    process.exit(1)
  }
}

const close = async () => {
  await fastify.close()
}

module.exports = {
  initialize,
  close
}
