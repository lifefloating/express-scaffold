/**
 * created by curdBoy
 */

import webpack from 'webpack'
import chalk from 'chalk'
import config from './config'
import webpackConfig from './webpack/server.build'
import { logger, getEnv, envDefinePlugin } from './libs/utils'
import { writeFile } from './libs/fs'

async function build(env) {
  env = env || getEnv()
  webpackConfig.plugins.push(envDefinePlugin(env))

  logger.chalk(`${chalk.blue('Enviroment: ')}${chalk.bgRed(env)}`)
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        // console.log(stats.toString(webpackConfig.stats)) //eslint-disable-line
        let statsJson = stats.toJson()
        if (statsJson.errors && statsJson.errors.length) {
          reject(statsJson.errors)
        } else {
          writeFile(`${config.dist}/webpack-server-stats.json`, JSON.stringify(statsJson))
          resolve()
        }
      }
    })
  })
}

export default {
  name: 'build server',
  func: build
}
