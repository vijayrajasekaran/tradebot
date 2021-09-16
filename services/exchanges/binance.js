'use strict'

// Dependencies
const boom = require('boom')

// Config
const CoreConfig = require('../../config/core')
const tBotConfig = new CoreConfig()
const SignalsHelper = require('../../helpers/signals')
const cache = require('../../helpers/cache')

// Binance credentials
const binanceApiKey = require('../../static/binance.json')
const Binance = require('binance-api-node').default

// Authenticated client can make signed calls
const binance = Binance({
  apiKey: binanceApiKey.APIKEY,
  apiSecret: binanceApiKey.APISECRET
})

module.exports = class binanceData {
  constructor (inputs) {
    this.inputs = inputs
  }

  async historicalData () {
    try {
      const marketData = await binance.candles({
        symbol: this.inputs.symbol,
        interval: this.inputs.interval,
        limit: this.inputs.period
      })
      return marketData
    } catch (err) {
      throw boom.boomify(err)
    }
  }

  async candles () {
    try {
      const marketData = { open: [], high: [], low: [], close: [], volume: [] }
      const clean = await binance.ws.candles(
        tBotConfig.symbol,
        tBotConfig.interval,
        candle => {
          marketData.open.push(candle.open)
          marketData.high.push(candle.high)
          marketData.low.push(candle.low)
          marketData.close.push(candle.close)
          marketData.volume.push(candle.volume)
          const signals = new SignalsHelper(marketData)
          signals.signals()
        })
      if (this.inputs.start) {
        cache.set('bot', { status: 'running' })
        console.log('BOT RUNNING')
        return { bot: { status: 'started' } }
      } else {
        cache.set('bot', { status: 'stopped' })
        clean()
        console.log('BOT STOPPED')
        return { bot: { status: 'stopped' } }
      }
    } catch (err) {
      throw boom.boomify(err)
    }
  }
}
