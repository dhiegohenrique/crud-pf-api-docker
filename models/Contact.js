const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema({
  cellphone: {
    type: String,
    required: true
  }
})

contactSchema.pre('save', (next) => {
  this.cellphone = getFormattedCellphone(this.cellphone)
  next()
})

const getFormattedCellphone = (cellphone) => {
  cellphone = cellphone.replace(/D/g, '')
  cellphone = cellphone.replace(/^(d{2})(d)/g, "($1) $2")
  cellphone = cellphone.replace(/(d)(d{4})$/, "$1-$2")
  return cellphone
}

module.exports = mongoose.model('Contact', contactSchema)
