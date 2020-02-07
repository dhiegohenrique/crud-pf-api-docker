process.env.NODE_ENV = 'test'
const db = require('../db/db')
let server

before(async () => {
  console.log('Starting up...')
  server = require('../server')
  try {
    await db.connect()
    await server.initialize()
  } catch (error) {
    console.error(error)
  }
  console.log('Done!')
})

after(async () => {
  console.log('Cleaning up...')
  await server.close()
  await db.dropDatabase()
  console.log('Finished')
})
