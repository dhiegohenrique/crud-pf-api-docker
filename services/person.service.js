const Person = require('../models/Person')
const baseService = require('./base.service')
const ObjectId = require('mongodb').ObjectID
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo')

const update = (person) => {
  return baseService.update(Person, person)
}

const get = (query) => {
  return baseService.get(Person, query)
}

const insert = (person) => {
  person.creationDate = new Date()

  person.address = person.address.map((address) => {
    return new ObjectId(address)
  })

  person.contact = person.contact.map((contact) => {
    return new ObjectId(contact)
  })

  return baseService.insert(Person, person)
}

const getById = (_id) => {
  return baseService.getById(Person, _id, [{
    path: 'address',
    populate: {
      path: 'uf',
      model: 'State'
    }
  }, 'contact'])
}

const deleteItem = (_id) => {
  return baseService.deleteItem(Person, _id)
}

const getAddressAndContact = (_id) => {
  return new Promise((resolve) => {
    Person.findById(_id).select(['address', 'contact'])
      .then((person) => {
        resolve(person)
      })
  })
}

module.exports = {
  update,
  get,
  insert,
  getById,
  deleteItem,
  getAddressAndContact
}
