const axios = require('axios')
const config = require('../config/config')()

const client = axios.create({
  baseURL: `http://localhost:${config.port}`,
  timeout: 30000
})

const get = () => {
  return client.get('/person')
}

const getById = (_id) => {
  return client.get(`/person/${new String(_id)}`)
}

const post = (person) => {
  return client.post('/person', person)
}

const put = (person) => {
  return client.put('/person', person)
}

const deletePerson = (_id) => {
  return client.delete(`/person/${new String(_id)}`)
}

module.exports = {
  get,
  getById,
  post,
  put,
  deletePerson
}
