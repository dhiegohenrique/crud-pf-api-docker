const homeController = require('../controllers/homeController')
const personController = require('../controllers/personController')

const routes = [
  {
    method: 'GET',
    url: '/',
    handler: homeController.home
  },
  {
    method: 'POST',
    url: '/person',
    handler: personController.insert
  },
  {
    method: 'GET',
    url: '/person',
    handler: personController.get
  },
  {
    method: 'GET',
    url: '/person/:id',
    handler: personController.getById
  },
  {
    method: 'PUT',
    url: '/person',
    handler: personController.update
  },
  {
    method: 'DELETE',
    url: '/person/:id',
    handler: personController.delete
  }
]

module.exports = routes
