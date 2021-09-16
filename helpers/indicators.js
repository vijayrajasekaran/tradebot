// Dependencies
const boom = require('boom')
const TalibHelper = require('../plugins/talib')

module.exports = class data {
  constructor (inputs) {
    Object.assign(this, inputs)
  }

  async talib () {
    try {
      this.type.forEach(async type => {
        if (type.signal1.type === 'indicator') {
          type.signal1.result = await new TalibHelper({
            indicator: (type.signal1.condition).toUpperCase(),
            marketData: this.marketData,
            period: type.signal1.value
          })
            .calc()
        }
        if (type.signal2.type === 'indicator') {
          type.signal2.result = await new TalibHelper({
            indicator: (type.signal2.condition).toUpperCase(),
            marketData: this.marketData,
            period: type.signal2.value
          })
            .calc()
        }
      })
      return this.type
    } catch (err) {
      throw boom.boomify(err)
    }
  }
}
