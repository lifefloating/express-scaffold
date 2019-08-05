/**
 * created by curdBoy
 * mongo连接
 */

import mongoose from 'mongoose'
import Promise from 'bluebird'
import { dbConn } from '../../config'
// import LogUtil from '../util/log-util'

let dbClients = {}

dbConn.connMap.forEach((value, key, map) => {
  let options = {
    poolSize: 8,
    reconnectTries: Number.MAX_VALUE,
    promiseLibrary: Promise,
    useMongoClient: true // fix debug error
  }
  let conn = mongoose.createConnection(value, options)
  if (__DEV__) {
    conn.on('connected', function(a, b, c) {
    })
  }
  conn.on('disconnected', function(a, b, c) {
    let message = `${dbConn[key]} disconnected`
    global.LogUtil.error(new Error('conn disconnected'), null, {method: 'disconnected', message: message})
  })
  conn.on('error', function(err) {
    let message = `${dbConn[key]} encountered error:${err.message}`
    global.LogUtil.error(err, null, {method: 'error', message: message})
  })
  dbClients[key] = conn
})

export default dbClients
