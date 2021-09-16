// Init tBot
const tBot = require('fastify')({
  pluginTimeout: 35000, // Timeout for Next.js
  logger: false
})

// Database connector
tBot.register(require('./config/database'))

// Cors
tBot.register(require('fastify-cors'), {
  origin: '*'
})

// Form Body
tBot.register(require('fastify-formbody'))

// View engine - Pug
tBot.register(require('point-of-view'), {
  engine: {
    pug: require('pug')
  }
})

// SSR - Next.js
try {
  tBot
    .register(require('fastify-nextjs'))
} catch (err) {
  console.log(err)
}

// Routes
const routes = require('./config/routes')
routes.forEach((route, index) => {
  tBot.route(route)
})

// Run server
const start = async () => {
  try {
    await tBot.listen(3000)
    tBot.log.info(`Server listening on ${tBot.server.address().port}`)
  } catch (err) {
    tBot.log.error(err)
    process.exit(1)
  }
}
start()
