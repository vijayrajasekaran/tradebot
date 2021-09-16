// Config
const CoreConfig = require('../config/core')
const strategyName = new CoreConfig().strategy

// Strategy
const strategy = require(`../strategies/${strategyName}.json`)

// Manage orders
const OrderHelper = require('./order')

// Comparison
function Comparison (value) {
  this.condition = value
  this.evaluate = (signal1, signal2) => {
    switch (this.condition) {
      case '===':
        return signal1 === signal2
      case '<':
        return signal1 < signal2
      case '>':
        return signal1 > signal2
      default:
        return null
    }
  }
}

module.exports = class decision {
  constructor (inputs) {
    this.inputs = inputs
    this.indicatorSignal = null
  }

  async signals () {
    try {
      const IndicatorsHelper = require('./indicators')
      const indicators = new IndicatorsHelper({ marketData: this.inputs, type: strategy.openLong })
      this.strategyData = await indicators.talib()
      if (this.strategyData) this.strategy()
    } catch (err) {
      await console.log(err)
    }
  }

  async strategy () {
    const compare = new Comparison()
    for (const i in this.strategyData) {
      const signal1 = this.strategyData[i].signal1.result
      const signal2 = this.strategyData[i].signal2.result
      if (signal1 && signal2) {
        compare.condition = this.strategyData[i].comparison
        this.indicatorSignal = compare.evaluate(signal1, signal2)
      } else {
        this.indicatorSignal = null
      }
    }
    this.verifySignal(this.indicatorSignal)
  }

  async verifySignal (signal) {
    try {
      const liveOrder = new OrderHelper()
      const order = await liveOrder.getLiveOrder()
      if (order.length > 0) {
        if (order[0].signal === 'long' && signal === false) {
          this.closeLong(order[0])
        }
        if (order[0].signal === 'short' && signal) {
          this.closeShort(order[0])
        }
      } else if (signal !== null) {
        signal ? this.openLong() : this.openShort()
      }
    } catch (err) {
      console.log(err)
    }
  }

  async openLong () {
    try {
      const order = new OrderHelper({
        buyPrice: this.inputs.close[this.inputs.close.length - 1],
        signal: 'long',
        strategy: 'sma'
      })
      order.createOrder()
    } catch (err) {
      console.log(err)
    }
  }

  async closeLong (liveOrder) {
    try {
      const data = { liveOrder: liveOrder, closePrice: this.inputs.close[this.inputs.close.length - 1] }
      const order = new OrderHelper()
      order.closeOrder(data)
    } catch (err) {
      console.log(err)
    }
  }

  async stopLong () {
    return await this.inputs
  }

  async openShort () {
    try {
      const order = new OrderHelper({
        buyPrice: this.inputs.close[this.inputs.close.length - 1],
        signal: 'short',
        strategy: 'sma'
      })
      order.createOrder()
    } catch (err) {
      console.log(err)
    }
  }

  async closeShort (liveOrder) {
    try {
      const data = { liveOrder: liveOrder, closePrice: this.inputs.close[this.inputs.close.length - 1] }
      const order = new OrderHelper()
      order.closeOrder(data)
    } catch (err) {
      console.log(err)
    }
  }

  async stopShort () {
    return await this.inputs
  }
}
