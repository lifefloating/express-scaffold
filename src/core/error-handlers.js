
const errorHandler = (err, req, res, next) => {
  if (err) {
    if (err.status === 404) {
      let error = {
        status: 0,
        message: err.message || '请求资源不存在'
      }
      res.status(404).json(error)
    } else {
      let error = {
        status: 0,
        message: err.message || '程序错误'
      }
      if (!__PROD__) {
        error.stack = err.stack || ''
      }
      res.status(500).json(error)
    }
  } else {
    next(err)
  }
}

const errorResponse = (err, req, res, next) => {
  if (req.xhr) {
    if (err.status === 401) {
      res.status(401).end() // 需权限 登录？
    // eslint-disable-next-line brace-style
    }
    // add your error code and msg
    else if (err.status === 404) {
      res.status(404).end()
    } else if (err.status === 423) { // 禁止访问
      res.status(423).end()
    } else {
      let error = {
        status: err.status || 500,
        message: err.message || '未知错误'
      }
      if (!__PROD__) {
        error.stack = err.stack || ''
      }
      res.status(500).json(error)
    }
  } else {
    next(err)
  }
}

const error500 = (err, req, res, next) => {
  if (!req.xhr) {
    let error = {
      status: err.status || 500,
      message: err.message || '未知错误'
    }
    if (!__PROD__) {
      error.stack = err.stack || ''
    }
    res.status(error.status).json(error)
  }
}

const error404 = (req, res) => {
  res.status(404).json({
    status: 404,
    message: '您请求的资源不存在'
  })
}

export default {
  all: [errorHandler, errorResponse, error500, error404]
}
