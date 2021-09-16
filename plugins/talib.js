'use strict'

// Dependencies
const boom = require('boom')
const t = require('talib')

module.exports = class talib {
  constructor (inputs) {
    this.inputs = inputs
  }

  async calc () {
    try {
      const result = await t.execute({
        name: this.inputs.indicator,
        high: this.inputs.marketData.high,
        low: this.inputs.marketData.low,
        close: this.inputs.marketData.close,
        inReal: this.inputs.marketData.close,
        startIdx: 0,
        endIdx: this.inputs.marketData.close.length - 1,
        optInTimePeriod: this.inputs.period
      })
      if (result.result.outReal.length > 0) {
        return result.result.outReal[result.result.outReal.length - 1]
      } else {
        return null
      }
    } catch (err) {
      throw boom.boomify(err)
    }
  }
}
