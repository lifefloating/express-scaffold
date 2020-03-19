/**
 * created by curdBoy
 */

let config = {}

// dev
if (__DEV__) {
  config.redis = require('./dev/redis')
  config.dbConn = require('./dev/mongo')
  config.mysqlConn = require('./dev/mysql')
  config.test = 'hello'
}
// prod
if (__PROD__) {
  config.redis = require('./prod/redis')
  config.dbConn = require('./prod/mongo')
  config.mysqlConn = require('./prod/mysql')
  config.test = 'hello'
}
module.exports = config
