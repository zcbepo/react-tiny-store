if (process.env.NODE_ENV === 'development') {
    module.exports = require('./lib/store.js')
} else {
    module.exports = require('./lib/store.prod.js')
}