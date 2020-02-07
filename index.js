const server = require('./server')
const db = require('./db/db')

;(async () => {
  await db.connect()
  await server.initialize()
})()
