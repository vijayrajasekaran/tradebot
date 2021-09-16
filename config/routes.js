'use strict'

// Controllers
const ordersController = require('../controllers/ordersController')
const indicatorsController = require('../controllers/indicatorsController')
const signalController = require('../controllers/signalController')

const routes = [
  {
    method: 'GET',
    url: '/orders',
    handler: ordersController.getAllOrders
  },
  {
    method: 'GET',
    url: '/config',
    handler: ordersController.getConfig
  },
  {
    method: 'GET',
    url: '/',
    handler: ordersController.getOrders
  },
  {
    method: 'GET',
    url: '/api/start',
    handler: signalController.start
  },
  {
    method: 'GET',
    url: '/api/stop',
    handler: signalController.stop
  },
  {
    method: 'GET',
    url: '/api/history',
    handler: indicatorsController.history
  }
]

module.exports = routes
