const Contact = require('../models/Contact')
const baseService = require('./base.service')

const update = (contact) => {
  return baseService.update(Contact, contact)
}

const get = (query) => {
  return baseService.get(Contact, query)
}

const insert = (contact) => {
  if (!Array.isArray(contact)) {
    contact = [contact]
  }

  contact = contact.map((currentContact) => {
    return {
      cellphone: getFormattedCellphone(currentContact)
    }
  })

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
      } else {
        const splitNumbers = currentContact.split('')
        const number = splitNumbers[0]
        const sameNumber = splitNumbers.every((currentNumber) => {
          return currentNumber === number
        })

        if (!(currentContact.length === 10 || currentContact.length === 11) || sameNumber) {
          error.message = 'Informe um celular válido.'
        }
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

const getFormattedCellphone = (cellphone) => {
  const ddd = cellphone.substring(0, 2)
  const final = cellphone.substring(cellphone.length - 4)
  const meio = cellphone.substring(2, cellphone.indexOf(final))
  return `(${ddd})${meio}-${final}`
}

module.exports = {
  update,
  get,
  insert,
  deleteItem,
  validate
}
