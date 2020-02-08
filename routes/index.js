const homeController = require('../controllers/homeController')
const personController = require('../controllers/personController')
const HttpStatus = require('http-status-codes')

const routes = [
  {
    method: 'GET',
    url: '/',
    handler: homeController.home,
    schema: {
      summary: 'Verificar se a API está ON',
      response: {
        200: {
          description: 'CRUD Pessoa física ON',
          type: 'string'
        }
      }
    }
  },
  {
    method: 'POST',
    url: '/person',
    handler: personController.insert,
    schema: {
      summary: 'Inserir uma pessoa',
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          cpf: { type: 'string' },
          email: { type: 'string' },
          birthDate: { type: 'string' },
          address: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                street: { type: 'string' },
                cep: { type: 'string' },
                neighborhood: { type: 'string' },
                city: { type: 'string' },
                uf: { type: 'string' }
              }
            }
          },
          contact: {
            type: 'array',
            items: {
              type: 'string',
              properties: {
                cellphone: { type: 'string' }
              }
            }
          }
        }
      },
      response: {
        201: {
          description: 'Pessoa inserida com sucesso.',
          type: 'object',
          properties: {
            _id: { type: 'string' }
          }
        }
      }
    }
  },
  {
    method: 'GET',
    url: '/person',
    handler: personController.get,
    schema: {
      summary: 'Retornar todas as pessoas',
      response: {
        200: {
          description: 'Pessoas retornadas com sucesso.',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              name: { type: 'string' },
              cpf: { type: 'string' },
              email: { type: 'string' },
              birthDate: { type: 'string' },
              creationDate: { type: 'string' },
              address: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    street: { type: 'string' },
                    cep: { type: 'string' },
                    neighborhood: { type: 'string' },
                    city: { type: 'string' },
                    uf: { type: 'string' }
                  }
                }
              },
              contact: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    cellphone: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  {
    method: 'GET',
    url: '/person/:id',
    handler: personController.getById,
    schema: {
      summary: 'Retornar uma pessoa',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: {
          description: 'Pessoa retornada com sucesso.',
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            cpf: { type: 'string' },
            email: { type: 'string' },
            birthDate: { type: 'string' },
            creationDate: { type: 'string' },
            address: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  street: { type: 'string' },
                  cep: { type: 'string' },
                  neighborhood: { type: 'string' },
                  city: { type: 'string' },
                  uf: {
                    type: 'object',
                    properties: {
                      uf: { type: 'string' }
                    }
                  }
                }
              }
            },
            contact: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  cellphone: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  },
  {
    method: 'PUT',
    url: '/person',
    handler: personController.update,
    schema: {
      summary: 'Atualizar uma pessoa',
      body: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          cpf: { type: 'string' },
          email: { type: 'string' },
          birthDate: { type: 'string' },
          address: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                street: { type: 'string' },
                cep: { type: 'string' },
                neighborhood: { type: 'string' },
                city: { type: 'string' },
                uf: { type: 'string' }
              }
            }
          },
          contact: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                cellphone: { type: 'string' }
              }
            }
          }
        }
      },
      response: {
        204: {
          description: 'Pessoa atualizada com sucesso.',
          type: 'object',
          properties: {
            id: { type: 'string' }
          }
        }
      }
    }
  },
  {
    method: 'DELETE',
    url: '/person/:id',
    handler: personController.delete,
    schema: {
      summary: 'Excluir uma pessoa',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        204: {
          description: 'Pessoa excluída com sucesso.',
          type: 'object',
          properties: {
            id: { type: 'string' }
          }
        }
      }
    }
  }
]

module.exports = routes
