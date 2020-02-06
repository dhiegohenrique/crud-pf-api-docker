const Contact = require('../models/Contact')
const baseService = require('./base.service')

const update = (contact) => {
  return baseService.update(Contact, contact)
}

const get = (query) => {
  return baseService.get(Contact, query)
}

const insert = (contact) => {
  return baseService.insert(Contact, contact)
}

const deleteItem = (_id) => {
  return baseService.deleteItem(Contact, _id)
}

module.exports = {
  update,
  get,
  insert,
  deleteItem
}
