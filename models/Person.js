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
  birthdayDate: {
    type: Date,
    default: true
  },
  creationDate: {
    type: Date
  },
  address: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address'
    }
  ],
  contact: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contact'
    }
  ],
})

module.exports = mongoose.model('Person', personSchema)
