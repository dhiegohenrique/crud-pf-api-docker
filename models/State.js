const mongoose = require('mongoose')
const stateSchema = new mongoose.Schema({
  uf: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('State', stateSchema)
