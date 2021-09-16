'use strict'

// Config
const CoreConfig = require('../config/core')
const tBotConfig = new CoreConfig()

// Import dependencies
const boom = require('boom')

// Init exchange
const tBotExchange = require(`./exchanges/${tBotConfig.exchange}`)

module.exports = class exchangeData {
  constructor (inputs) {
    this.inputs = inputs
  }

  static async historicalData () {
    try {
      const historicalData = await tBotExchange.historicalData(this.inputs)
      return historicalData
    } catch (err) {
      throw boom.boomify(err)
    }
  }

  static async candles () {
    try {
      const candles = await tBotExchange.candles(this.inputs)
      return candles
    } catch (err) {
      throw boom.boomify(err)
    }
  }
}
