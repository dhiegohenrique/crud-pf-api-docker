const boom = require('boom')
const HttpStatus = require('http-status-codes')
const personService = require('../services/person.service')
const addressService = require('../services/address.service')
const contactService = require('../services/contact.service')

exports.insert = async (req, res) => {
  let addressIds
  let contactIds

  try {
    const person = req.body

    const address = person.address
    let validate = await addressService.validate(address)
    if (!validate.isValid) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(validate)
    }

    const contact = person.contact
    validate = await contactService.validate(contact)
    if (!validate.isValid) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(validate)
    }

    addressIds = await addressService.insert(address)
    person.address = addressIds

    contactIds = await contactService.insert(contact)
    person.contact = contactIds

    const _id = await personService.insert(person)
    res.status(HttpStatus.CREATED).send({ _id })
  } catch (err) {
    if (addressIds && addressIds.length) {
      await addressService.deleteItem(addressIds)
    }

    if (contactIds && contactIds.length) {
      await contactService.deleteItem(contactIds)
    }

    throw boom.boomify(err)
  }
}

exports.get = async (req) => {
  try {
    return await personService.get(req.query)
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.getById = async (req, res) => {
  try {
    const person = await personService.getById(req.params.id)
    if (person) {
      return res.send(person)
    }

    res.send('Person not found')
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.update = async (req, res) => {
  try {
    const person = req.body
    const address = person.address
    if (address && address.length) {
      await addressService.update(address)
    }

    const contact = person.contact
    if (contact && contact.length) {
      await contactService.update(contact)
    }

    const newItems = await personService.update(person)
    res.status(HttpStatus.OK).send(newItems)
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.delete = async (req, res) => {
  try {
    const id = req.params.id
    const currentPerson = await personService.getAddressAndContact(id)
    const person = await personService.deleteItem(id)
    if (person) {
      await addressService.deleteItem(currentPerson.address)
      await contactService.deleteItem(currentPerson.contact)
      return res.status(HttpStatus.NO_CONTENT).send()
    }

    res.send('Person not found')
  } catch (err) {
    throw boom.boomify(err)
  }
}
