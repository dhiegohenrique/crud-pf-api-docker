const Address = require('../models/Address')
const baseService = require('./base.service')
const cepPromise = require('cep-promise')
const stateService = require('./state.service')
const ObjectId = require('mongodb').ObjectID

const update = (address) => {
  return new Promise(async (resolve) => {
    if (!Array.isArray(address)) {
      address = [address]
    }

    address.forEach(async (currentAddress, index) => {
      let uf = currentAddress.uf
      if (uf) {
        uf = await stateService.getId(uf)
        uf = new ObjectId(uf)
        currentAddress.uf = uf
      }

      if (index === (address.length - 1)) {
        const res = await baseService.update(Address, address)
        resolve(res)
      }
    })
  })
}

const get = (query) => {
  return baseService.get(Address, query)
}

const insert = (address) => {
  return new Promise((resolve) => {
    if (!Array.isArray(address)) {
      address = [address]
    }

    address.forEach(async (currentAddress, index) => {
      let uf = currentAddress.uf
      if (uf) {
        uf = await stateService.getId(uf)
        uf = new ObjectId(uf)
        currentAddress.uf = uf
      }

      if (index === (address.length - 1)) {
        const res = await baseService.insert(Address, address)
        resolve(res)
      }
    })
  })
}

const deleteItem = (_id) => {
  return baseService.deleteItem(Address, _id)
}

const validate = (address) => {
  return new Promise((resolve) => {
    if (!address || !address.length) {
      return resolve({
        isValid: false,
        message: 'Informe o endereço.'
      })
    }

    if (!Array.isArray) {
      address = [address]
    }

    const errors = []
    address.forEach(async (currentAddress, index) => {
      const error = {
        addressIndex: index
      }

      if (!currentAddress.street) {
        error.street = 'Informe a rua.'
      }

      const cep = currentAddress.cep
      if (!cep) {
        error.cep = 'Informe o cep.'
      } else {
        try {
          await cepPromise(cep)
        } catch (err) {
          error.cep = 'Informe um cep válido.'
        }
      }

      if (!currentAddress.neighborhood) {
        error.neighborhood = 'Informe o bairro.'
      }

      if (!currentAddress.city) {
        error.city = 'Informe a cidade.'
      }

      const uf = currentAddress.uf
      if (!uf) {
        error.uf = 'Informe o estado.'
      } else if (!await stateService.validate(uf)) {
        error.uf = 'Informe um estado válido.'
      }

      if (Object.keys(error).length > 1) {
        errors.push(error)
      }

      if (index === (address.length - 1)) {
        resolve({
          isValid: !errors.length,
          message: {
            address: {
              errors
            }
          }
        })
      }
    })
  })
}

module.exports = {
  update,
  get,
  insert,
  deleteItem,
  validate
}
