/* eslint-disable handle-callback-err */
/* eslint-disable new-cap */
import _ from 'lodash'
import os from 'os'
import Log from '../../models/mongo/log'
import reqLog from '../../models/mongo/reqLog'
import fatalLog from '../../models/mongo/fatal'
import errorFormatter from './errorFormatter'
import reqcontext from './reqContext'

let debug = (obj, req, opt) => {
  let level = 'debug'
  write(obj, req, opt, level)
}

let info = (obj, req, opt) => {
  let level = 'info'
  write(obj, req, opt, level)
}

let error = (obj, req, opt) => {
  let level = 'error'
  write(obj, req, opt, level)
}

let warning = (obj, req, opt) => {
  let level = 'warning'
  write(obj, req, opt, level)
}

let fatal = (type, obj) => {
  try {
    var log = new fatalLog({
      'errMsg': JSON.stringify(obj),
      'type': type
    })
    log.save(function (err, saved, affected) {
    })
  } catch (e) {
    // go on
  }
}

// 自定义log
function write(obj, req, opt, level) {
  try {
    if (obj == null) {
      return
    }
    var message = errorFormatter.format(obj)
    var msg = message.substring(0, 50)
    var context = reqcontext.extractReqInfo(req)
    var url = (context && context.url) || ''
    var method = (opt && opt.method) || _.last(url.split('/')) || 'programme'
    var parameter = url + '?' + (context ? context.parameters : '')
    var environment = __DEV__ ? 'dev' : 'prod'
    var log = new Log({
      'platform': context ? context.platform : '',
      'desc': message,
      'brief': msg,
      'method': method,
      'parameter': parameter,
      'env': environment,
      'headers': context ? context.headers : '',
      'ip': getIpAddress(),
      'level': level,
      'log_date': new Date()
    })
    log.save(function (err, saved, affected) {
    })
  } catch (e) {
    // go on
  }
}

// 记录每个请求信息
function logReq(obj, req) {
  try {
    if (obj == null) {
      return
    }
    var log = new reqLog({
      'status_code': obj.statusCode,
      'response_time': obj.responseTime,
      'url': obj.url,
      'body': obj.body,
      'query': obj.query,
      'headers': obj.headers
    })
    log.save(function (err, saved, affected) {
    })
  } catch (e) {
    // go on
  }
}

function getIpAddress() {
  var interfaces = os.networkInterfaces()
  if (interfaces && interfaces.eth0 && interfaces.eth0.length) { // Linux
    return interfaces.eth0[0].address || ''
  } else if (interfaces && interfaces.en0 && interfaces.en0.length) { // mac
    var ipv4 = interfaces.en0.filter(i => i.family === 'IPv4')
    return ipv4[0].address || ''
  } else if (interfaces && interfaces.以太网 && interfaces.以太网.length) { // Windows中文版
    return interfaces.以太网[0].address || ''
  }
  return ''
}

export default {
  error,
  info,
  debug,
  warning,
  logReq,
  fatal
}
