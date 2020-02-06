const mongoose = require('mongoose')
const addressSchema = new mongoose.Schema({
  logradouro: {
    type: String,
    required: true
  },
  cep: {
    type: String,
    required: true
  },
  neighborhood: {
    type: String,
    default: true
  },
  city: {
    type: String,
    default: true
  },
  uf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Uf'
  },
})

module.exports = mongoose.model('Address', addressSchema)