'use strict'

// Dependencies
const mongoose = require('mongoose')

try {
  const ordersSchema = new mongoose.Schema({
    perc: { type: Number, default: 0 },
    buyPrice: Number,
    sellPrice: Number,
    signal: String,
    strategy: String,
    buyTime: { type: String },
    sellTime: { type: Date, default: Date.now() }
  })
  module.exports = mongoose.model('Orders', ordersSchema)
} catch (err) {
  console.log(err)
}
