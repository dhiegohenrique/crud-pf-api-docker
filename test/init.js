process.env.NODE_ENV = 'test'

let server

before(() => {
  console.log('Starting up...')
  server = require('../index')
  console.log('Done!')
})

after(async () => {
  console.log('Cleaning up...')
  server.close()
  server.dropDatabase()
  console.log('Finished')
})
