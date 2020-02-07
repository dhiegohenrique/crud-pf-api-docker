const expect = require('chai').expect
const HttpStatus = require('http-status-codes')
const cpf = require('@fnando/cpf/dist/node')
const utils = require('./utils')
const personService = require('../services/person.service')
const addressService = require('../services/address.service')
const contactService = require('../services/contact.service')
const moment = require('moment')
const cloneDeep = require('clone-deep')
let time

describe('Person', () => {

  beforeEach(() => {
    time = new Date().getTime()
  })

  it('Should add new person', async () => {
    const person = getPerson()

    const res = await utils.post(person)
    expect(res.status).to.equal(HttpStatus.CREATED)

    const insertedPerson = res.data
    expect(insertedPerson._id).to.be.not.null
  })

  it('Should update person data', async () => {
    let person = getPerson()
    const personAddress = cloneDeep(person.address)
    const addressId = await addressService.insert(person.address)
    person.address = addressId

    const personContact = cloneDeep(person.contact)
    const contactId = await contactService.insert(person.contact)
    person.contact = contactId

    const personId = await personService.insert(person)
    person._id = personId[0]

    person.name = `${person.name}-editado`
    person.cpf = cpf.generate()
    person.email = `email-editado${time}@email.com`
    person.birthDate = moment(person.birthDate).add('1', 'day')
    delete person.address
    delete person.contact

    res = await utils.put(person)
    expect(res.status).to.equal(HttpStatus.OK)

    const updatedPerson = await personService.getById(person._id)

    delete person._id
    delete updatedPerson._id

    Object.keys(person).forEach((key) => {
      const personValue = person[key]
      const updatedPersonValue = updatedPerson[key]
      if (typeof personValue === 'string' || personValue instanceof String) {
        expect(personValue).to.equal(updatedPersonValue)
      } else {
        expect(moment(personValue).unix()).to.equal(moment(updatedPersonValue).unix())
      }
    })

    let updatedAddress = updatedPerson.address[0]
    updatedAddress = JSON.parse(JSON.stringify(updatedAddress))
    delete updatedAddress._id
    compareAddress(personAddress[0], updatedAddress)

    let updatedContact = updatedPerson.contact[0]
    updatedContact = JSON.parse(JSON.stringify(updatedContact))
    delete updatedContact._id
    compareContact(personContact[0], updatedContact)
  })
})

const generateCellphone = () => {
  let cellphone = '1'
  const numbers = '023456789'

  for (let index = 0;index < 10;index++) {
    cellphone += numbers.charAt(Math.floor(Math.random() * numbers.length))
  }

  return cellphone
}

const getPerson = () => {
  return {
    name: `Nome ${time}`,
    'cpf': cpf.generate(),
    email: `email${time}@email.com`,
    birthDate: moment(),
    address: [
      {
        street: `Rua ${time}`,
        cep: '88015902',
        neighborhood: `Bairro ${time}`,
        city: `Cidade ${time}`,
        uf: 'sc'
      }
    ],
    contact: [
      generateCellphone()
    ]
  }
}

const compareAddress = (address1, address2) => {
  Object.keys(address2).forEach((key) => {
    const value1 = address1[key]
    const value2 = address2[key]

    if (key === 'uf') {
      const { uf } = value2
      expect(value1.toLowerCase()).to.equal(uf.toLowerCase())
    } else {
      expect(value1).to.equal(value2)
    }
  })
}

const compareContact = (contact1, contact2) => {
  expect(contactService.getFormattedCellphone(contact1)).to.equal(contact2.cellphone)
}
