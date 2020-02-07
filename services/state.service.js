const State = require('../models/State')

const validate = (uf) => {
  return new Promise((resolve) => {
    State.findOne({ 'uf': { $regex: new RegExp(uf, 'i') } }).select('_id')
      .then((state) => {
        resolve(state ? true : false)
      })
  })
}

const getId = (uf) => {
  return new Promise((resolve) => {
    State.findOne({ 'uf': { $regex: new RegExp(uf, 'i') } }).select('_id')
      .then((state) => {
        resolve(state._id)
      })
  })
}

module.exports = {
  validate,
  getId
}
