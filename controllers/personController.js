const boom = require('boom')
const HttpStatus = require('http-status-codes')
const personService = require('../services/person.service')

exports.insert = async (req, res) => {
  try {
    const _id = await personService.insert(req.body)
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
