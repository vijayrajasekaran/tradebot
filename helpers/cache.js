const NodeCache = require('node-cache')
const cache = new NodeCache()
cache.mset([
  { key: 'bot', val: { status: 'stopped' } }
])
module.exports = cache
