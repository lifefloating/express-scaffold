/* eslint-disable no-multi-str */
var util = require('util')
var errorList = ['businessError', 'mongoError', 'error']

function format(err) {
  for (var i = 0; i < errorList.length; i++) {
    var item = errorList[i]
    var method = util.format('format%s(err)', item)
    // eslint-disable-next-line no-eval
    var message = eval(method)
    if (message) {
      return message
    }
  }

  if (typeof (err) === 'object') {
    if (err.msg) {
      return err.msg
    } else if (err.message) {
      return err.message
    } else {
      return JSON.stringify(err)
    }
  }

  return err ? err.toString() : '-'
}

// format other error ...


module.exports = {
  format: format
}
