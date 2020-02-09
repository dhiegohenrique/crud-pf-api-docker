const Person = require('../models/Person')
const Address = require('../models/Address')
const Contact = require('../models/Contact')
const baseService = require('./base.service')
const ObjectId = require('mongodb').ObjectID
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo')

const update = (person) => {
  return new Promise(async (resolve) => {
    const newItems = await baseService.update(Person, person)

    const { _id } = person
    const currentAddressIds = person.address

    const addressIds = await getIds(_id, 'address')
    const diffAddressIds = addressIds.filter((_id) => {
      const index = currentAddressIds.findIndex((currentAddressId) => {
        return new String(currentAddressId).includes(_id)
      })

      return index === -1
    })

    if (diffAddressIds && diffAddressIds.length) {
      await baseService.deleteRemainingItems(Address, diffAddressIds)
    }

    const currentContactIds = person.contact
    const contactIds = await getIds(_id, 'contact')

    const diffContactIds = contactIds.filter((_id) => {
      const index = currentContactIds.findIndex((currentContactId) => {
        return new String(currentContactId).includes(_id)
      })

      return index === -1
    })

    if (diffContactIds && diffContactIds.length) {
      await baseService.deleteRemainingItems(Contact, diffContactIds)
    }

    resolve(newItems)
  })
}

const getIds = (_id, field) => {
  return new Promise(async (resolve) => {
    const person = await Person.findById(_id).select(field)
    const _ids = person[field].map((currentField) => {
      return currentField
    })

    resolve(_ids)
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
