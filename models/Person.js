const mongoose = require('mongoose')
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: true
  },
  dateNascimento: {
    type: Date,
    default: true
  },
  dateCadastro: {
    type: Date
  },
  address: {
    type: Array
  },
  contact: {
    type: Array
  }
})

module.exports = mongoose.model('Person', personSchema)
