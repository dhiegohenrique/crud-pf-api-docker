const boom = require('boom')
const HttpStatus = require('http-status-codes')
const personService = require('../services/person.service')
const addressService = require('../services/address.service')

exports.insert = async (req, res) => {
  try {
    const person = req.body
    const address = person.address
    if (!address || !address.length) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Informe o endereço.'
      })
    } else {
      const validate = await addressService.validate(address)
      if (validate.message.address.errors.length) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(validate)
      }
    }

    const _id = await personService.insert(person)
    res.status(HttpStatus.CREATED).send(_id)
  } catch (err) {
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
    const newItems = await personService.update(req.body)
    res.status(HttpStatus.OK).send(newItems)
  } catch (err) {
    throw boom.boomify(err)
  }
}

exports.delete = async (req, res) => {
  try {
    const person = await personService.deleteItem(req.params.id)
    if (person) {
      return res.status(HttpStatus.NO_CONTENT).send()
    }

    res.send('Person not found')
  } catch (err) {
    throw boom.boomify(err)
  }
}
