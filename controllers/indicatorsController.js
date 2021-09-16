'use strict'

// Dependencies
const boom = require('boom')

// Services
const history = require('../services/index')

module.exports = {
  history: async (req, reply) => {
    try {
      const data = {
        symbol: 'BTCUSDT',
        interval: '1m',
        period: 30
      }
      const result = await history.historicalData(data)
      return result
    } catch (err) {
      throw boom.boomify(err)
    }
  }
}
