const routes = require('./routes')
const mongoose = require('mongoose')
const swagger = require('./config/swagger')
const config = require('./config/config')()
const socket = require('./socket/socket')

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

mongoose.connect(config.db)
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err))

const start = async () => {
  try {
    await fastify.listen(config.port, '0.0.0.0')
    socket.initialize(fastify.server)
    fastify.swagger()
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
