const expect = require('chai').expect
const HttpStatus = require('http-status-codes')
const cpf = require('@fnando/cpf/dist/node')
const utils = require('./utils')

describe('Person', () => {
  beforeEach(() => {
  })

  it('Should add new person', async () => {
    const time = new Date().getTime()

    const person = {
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

    const res = await utils.post(person)
    expect(res.status).to.equal(HttpStatus.CREATED)

    const insertedPerson = res.data
    expect(insertedPerson._id).to.be.not.null
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
