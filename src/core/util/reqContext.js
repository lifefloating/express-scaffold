/**
 * 整理一些上下文信息
 */
function extractReqInfo(req) {
  if (!req) {
    return null
  }

  var params = ''
  for (var attribute in req.params) {
    if (typeof (attribute) === 'string') {
      params += attribute + '=' + req.params[attribute] + '&'
    }
  }

  var headers = ''
  for (var head in req.headers) {
    if (typeof (head) === 'string') {
      headers += head + '=' + req.headers[head] + '&'
    }
  }
  return {
    url: req.url,
    platform: (req.headers && req.headers.platform) ? req.headers.platform : null,
    parameters: params,
    headers: headers
  }
}

function setReqContext(req, value) {
  req._context = value
}
function getReqContext(req) {
  return req._context
}

module.exports = {
  extractReqInfo: extractReqInfo,
  setReqContext: setReqContext,
  getReqContext: getReqContext
}
