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
    let { person, personAddress, personContact } = await insertPerson()

    const personId = await personService.insert(person)
    person._id = personId[0]

    person.name = `${person.name}-editado`
    person.cpf = cpf.generate()
    person.email = `email-editado${time}@email.com`
    person.birthDate = moment(person.birthDate).add('1', 'day')
    delete person.address
    delete person.contact

    const res = await utils.put(person)
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

  it('Should update address', async () => {
    let { person } = await insertPerson()
    const personId = await personService.insert(person)

    const updatedPerson = {
      _id: personId[0],
      address: [
        {
          _id: new String(person.address),
          street: `Rua editada ${time}`,
          cep: '88036420',
          neighborhood: `Bairro editado ${time}`,
          city: `Cidade editada ${time}`,
          uf: 'pr'
        }
      ],
    }

    const res = await utils.put(updatedPerson)
    expect(res.status).to.equal(HttpStatus.OK)

    const currentPerson = await personService.getById(person._id)
    let updatedAddress = currentPerson.address[0]
    updatedAddress = JSON.parse(JSON.stringify(updatedAddress))
    delete updatedAddress._id

    compareAddress(updatedPerson.address[0], updatedAddress)
  })

  it('Should update contact', async () => {
    let { person } = await insertPerson()
    const personId = await personService.insert(person)

    const updatedPerson = {
      _id: personId[0],
      contact: [
        {
          _id: new String(person.contact),
          cellphone: generateCellphone()
        }
      ],
    }

    const res = await utils.put(updatedPerson)
    expect(res.status).to.equal(HttpStatus.OK)

    const currentPerson = await personService.getById(person._id)
    let updatedContact = currentPerson.contact[0]
    updatedContact = JSON.parse(JSON.stringify(updatedContact))

    compareContact(updatedPerson.contact[0], updatedContact)
  })

  it('Should delete person', async () => {
    let { person } = await insertPerson()
    let personId = await personService.insert(person)
    personId = personId[0]

    const res = await utils.deletePerson(personId)
    expect(res.status).to.equal(HttpStatus.NO_CONTENT)

    const deletedPerson = await personService.getById(personId)
    expect(deletedPerson).to.be.null

    const deletedAddress = await addressService.getById(person.address)
    expect(deletedAddress).to.be.null

    const deletedContact = await contactService.getById(person.contact)
    expect(deletedContact).to.be.null
  })

  it('Should return all person', async () => {
    const arrayPerson = []
    for (let index = 0;index < 3;index++) {
      let { person } = await insertPerson()
      let personId = await personService.insert(person)
      person._id = personId[0]

      arrayPerson.push(person)
    }

    const res = await utils.get()
    expect(res.status).to.equal(HttpStatus.OK)

    const currentPerson = res.data
    expect(currentPerson.length).to.equal(arrayPerson.length)

    for (let index = 0;index < currentPerson.length;index++) {
      const person = currentPerson[index]
      Object.keys(person).forEach((key) => {
        const value = person[key]
        if (typeof value === 'string' || value instanceof String) {
          expect(value).to.be.not.null
        }
      })
    }
  })

  it('Should return person by id', async () => {
    let { person } = await insertPerson()
    let personId = await personService.insert(person)
    person._id = personId[0]

    const res = await utils.getById(person._id)
    expect(res.status).to.equal(HttpStatus.OK)

    person = res.data
    Object.keys(person).forEach((key) => {
      const value = person[key]
      if (typeof value === 'string' || value instanceof String) {
        expect(value).to.be.not.null
      }
    })
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
    birthDate: new Date(),
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
  if (contact1.cellphone) {
    contact1 = contact1.cellphone
  }

  expect(contactService.getFormattedCellphone(contact1)).to.equal(contact2.cellphone)
}

const insertPerson = () => {
  return new Promise(async (resolve) => {
    let person = getPerson()
    const personAddress = cloneDeep(person.address)
    const addressId = await addressService.insert(person.address)
    person.address = addressId

    const personContact = cloneDeep(person.contact)
    const contactId = await contactService.insert(person.contact)
    person.contact = contactId
    resolve({
      person,
      personAddress,
      personContact
    })
  })
}
