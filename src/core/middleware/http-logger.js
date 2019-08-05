/**
 * created by curdBoy
 */

import onFinished from 'on-finished'
import onHeaders from 'on-headers'
import logger from '../util/log-util'

function startTime() {
  this._startAt = process.hrtime()
}

var calResponseTime = (req, res) => {
  if (!req._startAt || !res._startAt) {
    return
  }
  let ms = (res._startAt[0] - req._startAt[0]) * 1e3 + (res._startAt[1] - req._startAt[1]) * 1e-6
  return ms
}

export default (req, res, next) => {
  req._startAt = undefined
  res._startAt = undefined
  startTime.call(req)

  onHeaders(res, startTime)
  onFinished(res, () => {
    logger.logReq({
      statusCode: res._header ? res.statusCode : undefined,
      responseTime: calResponseTime(req, res),
      url: req.originalUrl,
      body: JSON.stringify(req.body),
      query: JSON.stringify(req.query),
      headers: JSON.stringify(req.headers)
    })
  })
  next()
}
