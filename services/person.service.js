const Person = require('../models/Person')
const baseService = require('./base.service')

const update = (person) => {
  return baseService.update(Person, person)
}

const get = (query) => {
  return baseService.get(Person, query)
}

const insert = (body) => {
  return baseService.insert(Person, body)
}

const getById = (_id) => {
  return baseService.getById(Person, _id)
}

const deleteItem = (_id) => {
  return baseService.deleteItem(Person, _id)
}

module.exports = {
  update,
  get,
  insert,
  getById,
  deleteItem
}
