const routes = require('./routes')
const mongoose = require('mongoose')
const swagger = require('./config/swagger')
const config = require('./config/config')()

const fastify = require('fastify')({
  logger: true
})

fastify.register(require('fastify-swagger'), swagger.options)
fastify.register(require('fastify-cors'), {
  origin: config.url_client
})

routes.forEach((route) => {
  fastify.route(route)
})

let mongo

const start = async () => {
  try {
    mongo = await mongoose.connect(config.db)
    console.log('MongoDB connected…')

    await fastify.listen(config.port, '0.0.0.0')
    fastify.swagger()
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

const close = async () => {
  await fastify.close()
}

const dropDatabase = async () => {
  await mongoose.connection.dropDatabase()
}

module.exports = {
  close,
  dropDatabase
}
