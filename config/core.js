'use strict'

// Config
const configParams = require('../config.json')

module.exports = class config {
  constructor () {
    Object.assign(this, configParams)
  }

  static exchange () {
    return this.exchange
  }

  static symbol () {
    const symbol = (this.symbol).toUpperCase()
    return symbol
  }

  static interval () {
    return this.interval
  }

  static period () {
    return this.period
  }

  static strategy () {
    return this.strategy
  }
}
