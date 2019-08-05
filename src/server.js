import express from 'express'
import helmet from 'helmet'
import http from 'http'
import https from 'https'
import bodyParser from 'body-parser'
import compression from 'compression'
import routes from './server-route'
import middleware from './core/middleware'
import logUtil from './core/util/log-util'
import errorHandlers from './core/error-handlers'

http.globalAgent.keepAlive = true
http.globalAgent.keepAliveMsecs = 60 * 1000

https.globalAgent.keepAlive = true
https.globalAgent.keepAliveMsecs = 60 * 1000
global.logUtil = logUtil

if (!__DEV__) {
  process.on('uncaughtException', (err) => {
    logUtil.fatal('uncaughtException', err)
    setTimeout(() => {
      process.exit(1)
    }, 0)
  })
  process.on('unhandledRejection', (err) => {
    logUtil.fatal('unhandledRejection', err)
  })
}

const PORT = 9000
const app = express()

// attach helmet middleware
app.use(helmet())

// attach compression middleware
app.use(compression())

// body-parser
app.use(bodyParser.json())
app.use(bodyParser.raw({ limit: '5000kb' }))
app.use(bodyParser.urlencoded({ extended: false, limit: '5000kb' }))
app.use(bodyParser.text({ type: 'text/xml' }))

app.use(middleware.httpLogger)

routes(app)

// handle 500 ..etc
app.use(errorHandlers.all)


// start server
app.listen(PORT, function(err) {
  if (err) {
    throw err
  }
  // logger.info(`Listening at http://localhost:${PORT}/`) // eslint-disable-line
})
