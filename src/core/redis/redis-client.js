/**
 * created by curdBoy
 */

import redis from 'redis'
import Promise from 'bluebird'
import _ from 'lodash'
import config from '../../config'

const clients = {}
Promise.promisifyAll(redis.RedisClient.prototype)
Promise.promisifyAll(redis.Multi.prototype)

let createClient = (name) => {
  let cfg = config.redis[name]
  let client = redis.createClient({
    ...cfg,
    retry_strategy: (options) => {
      return 1000
    }
  })
  client.on('error', function(err) {
    global.logUtil.error(err)
  })
  return client
}

_.forIn(config.redis, (val, key) => {
  clients[key] = createClient(key)
})

export default (name) => {
  if (!clients[name]) {
    clients[name] = createClient(name)
  }
  return clients[name]
}
