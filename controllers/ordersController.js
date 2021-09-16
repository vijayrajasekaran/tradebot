'use strict'

// Dependencies
const boom = require('boom')

// Models
const LiveOrders = require('../models/LiveOrders')
const Orders = require('../models/Orders')
const cache = require('../helpers/cache')

module.exports = {
  // Get all orders
  getAllOrders: async (req, reply) => {
    try {
      const orders = await Orders.find()
      return reply.nextRender('/orders', { orders: orders })
    } catch (err) {
      throw boom.boomify(err)
    }
  },

  // Config
  getConfig: async (req, reply) => {
    try {
      const config = require('../config.json')
      return reply.nextRender('/config', { config: config })
    } catch (err) {
      throw boom.boomify(err)
    }
  },

  // LiveOrders
  getOrders: async (req, reply) => {
    try {
      const liveOrders = await LiveOrders.find()
      const botStatus = cache.get('bot').status
      return reply.nextRender('/dashboard', { liveOrders: liveOrders[0], botStatus: botStatus })
    } catch (err) {
      throw boom.boomify(err)
    }
  }
}
