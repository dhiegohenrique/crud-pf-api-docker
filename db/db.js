const mongoose = require('mongoose')
const config = require('../config/config')()
const mongooseRegisterEvents = require('./mongooseRegisterEvents')

const connect = async () => {
  try {
    mongooseRegisterEvents(mongoose)
    await mongoose.connect(config.db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log('MongoDB connected…')
  } catch (err) {
    console.log('Mongo error: ' + err)
    process.exit(1)
  }
}

const dropDatabase = async () => {
  await mongoose.connection.dropDatabase()
}

module.exports = {
  connect,
  dropDatabase
}
