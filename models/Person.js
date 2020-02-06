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

personSchema.path('cpf').validate((cpf) => {
  cpf = cpf.replace(/\D/g, '')
  const index = 0
  let sum = 0
  cpf = cpf.split('')
  const dv11 = cpf[cpf.length - 2]
  const dv12 = cpf[cpf.length - 1]
  cpf.splice(cpf.length - 2, 2)
  for (index = 0;index < cpf.length;index++) {
    sum += cpf[index] * (10 - index)
  }

  const dv21 = (sum % 11 < 2) ? 0 : (11 - (sum % 11))
  cpf.push(dv21)
  sum = 0
  for (index = 0;index < cpf.length;index++) {
    sum += cpf[index] * (11 - index)
  }
  var dv22 = (sum % 11 < 2) ? 0 : (11 - (sum % 11))

  if (dv11 == dv21 && dv12 == dv22) {
    return true
  }

  return false
}, 'O cpf informado não é válido.')

module.exports = mongoose.model('Person', personSchema)
