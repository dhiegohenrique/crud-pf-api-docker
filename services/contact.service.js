const Contact = require('../models/Contact')
const baseService = require('./base.service')
const brazilianUtils = require('@brazilian-utils/brazilian-utils')

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

const validate = (contact) => {
  return new Promise((resolve) => {
    if (!contact || !contact.length) {
      return resolve({
        isValid: false,
        message: 'Informe o celular.'
      })
    }

    if (!Array.isArray) {
      contact = [contact]
    }

    const errors = []
    contact.forEach(async (currentContact, index) => {
      currentContact = currentContact.replace(/\D/g, '')
      const error = {
        contactIndex: index
      }

      if (!currentContact) {
        error.message = 'Informe o celular'
      } else if (!brazilianUtils.isValidPhone(currentContact)) {
        error.message = 'Informe um celular válido.'
      }

      if (Object.keys(error).length > 1) {
        errors.push(error)
      }

      if (index === (contact.length - 1)) {
        resolve({
          isValid: !errors.length,
          message: {
            contact: {
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
