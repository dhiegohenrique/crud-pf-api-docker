const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const config = require('../config/config')()
const mongooseRegisterEvents = require('./mongooseRegisterEvents')
const State = require('../models/State')

const connect = () => {
  return new Promise((resolve) => {
    try {
      mongooseRegisterEvents(mongoose)
      mongoose.connect(config.db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
        .then(async () => {
          console.log('MongoDB connected…')
          await populateStates()
          resolve()
        })
    } catch (err) {
      console.log('Mongo error: ' + err)
      process.exit(1)
    }
  })
}

const populateStates = () => {
  return new Promise((resolve) => {
    const states = [
      { uf: 'AC' },
      { uf: 'AL' },
      { uf: 'AP' },
      { uf: 'AM' },
      { uf: 'BA' },
      { uf: 'CE' },
      { uf: 'DF' },
      { uf: 'ES' },
      { uf: 'GO' },
      { uf: 'MA' },
      { uf: 'MT' },
      { uf: 'MS' },
      { uf: 'MG' },
      { uf: 'PA' },
      { uf: 'PB' },
      { uf: 'PR' },
      { uf: 'PE' },
      { uf: 'PI' },
      { uf: 'RJ' },
      { uf: 'RN' },
      { uf: 'RS' },
      { uf: 'RO' },
      { uf: 'RR' },
      { uf: 'SC' },
      { uf: 'SP' },
      { uf: 'SE' },
      { uf: 'TO' }
    ]

    states.forEach(async (uf, index) => {
      let state = await State.findOne({ 'uf': { $regex: new RegExp(uf, 'i') } }).select('_id')
      if (!state) {
        state = new State(uf)
        await state.save()
        console.log(`Populate state '${uf.uf}'...`)
      }

      if (index === (states.length - 1)) {
        resolve()
      }
    })
  })
}

const dropDatabase = () => {
  return mongoose.connection.dropDatabase()
}

module.exports = {
  connect,
  dropDatabase
}
