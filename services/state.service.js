const State = require('../models/State')

const validate = (uf) => {
  return new Promise(async (resolve) => {
    const state = await State.findOne({ 'uf': { $regex: new RegExp(uf, 'i') } }).select('_id')
    resolve(state ? true : false)
  })
}

module.exports = {
  validate
}
