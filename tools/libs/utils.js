/**
 * created by curdBoy
 */

import chalk from 'chalk'
import webpack from 'webpack'

export const format = (time) => {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] ')
}

export const getEnv = () => {
  let env = 'dev'
  if (process.argv.length >= 3) {
    let args = process.argv.slice(2)
    if (args.includes('prod')) {
      env = 'prod'
    }
  }
  return env
}

export const logger = {
  success: (msg) => {
    console.log(`${format(new Date())}${chalk.green(msg)}`) //eslint-disable-line
  },
  error: (msg) => {
    console.log(`${format(new Date())}${chalk.red(msg)}`) //eslint-disable-line
  },
  info: (msg) => {
    console.log(`${format(new Date())}${chalk.blue(msg)}`) //eslint-disable-line
  },
  debug: (msg) => {
    console.log(`${format(new Date())}${chalk.yellow(msg)}`) //eslint-disable-line
  },
  chalk: (msg) => {
    console.log(`${format(new Date())}${msg}`) //eslint-disable-line
  }
}

export const envDefinePlugin = (env) => {
  return new webpack.DefinePlugin({
    '__DEV__': env === 'dev',
    '__PROD__': env === 'prod'
  })
}
