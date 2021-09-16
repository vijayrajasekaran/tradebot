'use strict'

// Dependencies
const tBotPlugin = require('fastify-plugin')
const mongoose = require('mongoose')

// Database
const db = async () => {
  mongoose.connect('mongodb://localhost/tradebot', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => console.log(err))
}

module.exports = tBotPlugin(db)
