if (process.env.NODE_ENV !== 'production') {
    module.exports = require('./lib/store.js')
} else {
    module.exports = require('./lib/store.prod.js')
}