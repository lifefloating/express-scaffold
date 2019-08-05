var util = require('util')

function businessError(message, status, str) {
  this.message = message
  this.status = status || 0 // 异常
  Error.captureStackTrace(this, str || this)
}

util.inherits(businessError, Error)

businessError.prototype.name = 'businessError'
businessError.prototype.status = '0'

module.exports = businessError
