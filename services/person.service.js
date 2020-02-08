const Person = require('../models/Person')
const Address = require('../models/Address')
const Contact = require('../models/Contact')
const baseService = require('./base.service')
const ObjectId = require('mongodb').ObjectID
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo')

const update = (person) => {
  return new Promise(async(resolve) => {
    const newItems = await baseService.update(Person, person)
    const addressIds = getIds(person.address)
    const contactIds = getIds(person.contact)

    await baseService.deleteRemainingItems(Address, addressIds)
    await baseService.deleteRemainingItems(Contact, contactIds)

    resolve(newItems)
  })
}

const getIds = (array) => {
  return array.map((item) => {
    return item._id
  })
}

const get = (query) => {
  return baseService.get(Person, query)
}

const insert = (person) => {
  person.creationDate = moment().toDate()

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
