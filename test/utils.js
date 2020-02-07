const axios = require('axios')
const config = require('../config/config')()

const client = axios.create({
  baseURL: `http://localhost:${config.port}`,
  timeout: 30000
})

const get = () => {
  return new Promise((resolve) => {

  })
}

const post = (person) => {
  return client.post('/person', person)
}

module.exports = {
  get,
  post
}
