const mongoose = require('mongoose')
const cpfGenerator = require('@fnando/cpf/dist/node')
const validator = require('validator')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Informe o nome.'],
    maxlength: [100, 'O tamanho máximo do campo é 100 caracteres.'],
    minlength: [3, 'Insira pelo menos 3 caracteres.']
  },
  cpf: {
    type: String,
    required: [true, 'Informe o cpf.'],
  },
  email: {
    type: String,
    required: [true, 'Informe o e-mail.']
  },
  birthdayDate: {
    type: Date,
    required: [true, 'Informe a data de nascimento.']
  },
  creationDate: {
    type: Date,
    default: moment()
  },
  // address: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Address'
  //   }
  // ],
  // contact: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Contact'
  //   }
  // ],
})

personSchema.path('cpf').validate((cpf) => {
  return cpfGenerator.isValid(cpf)
}, 'O cpf informado não é válido.')

personSchema.path('email').validate((email) => {
  return validator.isEmail(email)
}, 'O e-mail informado não é válido')

module.exports = mongoose.model('Person', personSchema)
