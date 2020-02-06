const Address = require('../models/Address')
const baseService = require('./base.service')

const update = (address) => {
  return baseService.update(Address, address)
}

const get = (query) => {
  return baseService.get(Address, query)
}

const insert = (address) => {
  return baseService.insert(Address, address)
}

const deleteItem = (_id) => {
  return baseService.deleteItem(Address, _id)
}

module.exports = {
  update,
  get,
  insert,
  deleteItem
}
