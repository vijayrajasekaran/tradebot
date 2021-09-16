'use strict'

// Dependencies
const boom = require('boom')
const CoreConfig = require('../config/core')
const tBotConfig = new CoreConfig()
const config = require('../config.json')

// Init exchange and candles
const Exchange = require(`../services/exchanges/${tBotConfig.exchange}`)

module.exports = {
  start: async (req, reply) => {
    try {
      config.start = true
      config.stop = false
      const tBotExchange = new Exchange(config)
      const candles = tBotExchange.candles()
      return candles
    } catch (err) {
      throw boom.boomify(err)
    }
  },

  stop: async (req, reply) => {
    try {
      config.start = false
      config.stop = true
      const tBotExchange = new Exchange(config)
      const candles = tBotExchange.candles()
      return candles
    } catch (err) {
      throw boom.boomify(err)
    }
  }
}
