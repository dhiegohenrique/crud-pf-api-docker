const mongoose = require('mongoose')
const ufSchema = new mongoose.Schema({
  uf: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Uf', ufSchema)
