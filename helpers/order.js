'use strict'

// Dependencies
const boom = require('boom')

// Models
const LiveOrders = require('../models/LiveOrders')
const Orders = require('../models/Orders')

module.exports = class order {
  constructor (inputs) {
    this.inputs = inputs
  }

  async getLiveOrder () {
    try {
      const orders = await LiveOrders.find()
      return orders
    } catch (err) {
      throw boom.boomify(err)
    }
  }

  async createOrder () {
    try {
      const order = new LiveOrders(this.inputs)
      return order.save()
    } catch (err) {
      throw boom.boomify(err)
    }
  }

  async closeOrder (props) {
    try {
      await LiveOrders.findByIdAndRemove(props.liveOrder._id)
      const perc = ((props.closePrice) - (props.liveOrder.buyPrice)) / ((props.closePrice) * 100)
      const order = {
        perc: perc.toFixed(2),
        buyPrice: props.liveOrder.buyPrice,
        sellPrice: props.closePrice,
        signal: props.liveOrder.signal,
        strategy: props.liveOrder.strategy,
        buyTime: props.liveOrder.buyTime
      }
      const newOrder = new Orders(order)
      await newOrder.save()
    } catch (err) {
      throw boom.boomify(err)
    }
  }
}
