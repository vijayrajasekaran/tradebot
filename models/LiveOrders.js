'use strict'

// Dependencies
const mongoose = require('mongoose')

try {
  const liveOrdersSchema = new mongoose.Schema({
    perc: { type: Number, default: 0 },
    buyPrice: Number,
    signal: String,
    strategy: String,
    buyTime: { type: Date, default: Date.now() }
  })
  module.exports = mongoose.model('LiveOrders', liveOrdersSchema)
} catch (err) {
  console.log(err)
}
