/**
 * created by curdBoy
 */

import webpack from 'webpack'
import cp from 'child_process'
import { format, envDefinePlugin } from './libs/utils'
import { copyEnvConfig } from './copy'
import run from './run'
import clean from './clean'
import config from './config'
import devServerConfig from './webpack/server.dev'

async function start() {
  await run(clean)
  await run(copyEnvConfig, 'dev')

  await new Promise((resolve) => {
    let watchOptions = {
      aggregateTimeout: 200,
      poll: true
    }

    // setup server env config
    devServerConfig.plugins.push(envDefinePlugin('dev'))

    // init server and client compiler
    const serverCompiler = webpack(devServerConfig)

    let handleServerBundleCompleted = (stats) => {
      startServer()
    }

    let server = null

    const onStdOut = (data) => {
      const match = data.toString('utf8').match(/Listening at http:\/\/(.*?)\//)
      process.stdout.write(format(new Date()))
      process.stdout.write(data)

      if (match) {
        server.stdout.removeListener('data', onStdOut)
        server.stdout.on('data', x => process.stdout.write(x))
      }
    }

    const startServer = function() {
      if (server) {
        server.kill('SIGTERM')
      }

      server = cp.spawn('node', ['--inspect', `./${config.dist}/server`], {
        env: Object.assign({
          NODE_ENV: 'development'
        }, process.env),
        silent: false
      })

      server.stdout.on('data', onStdOut)
      server.stderr.on('data', x => process.stderr.write(x))
    }

    serverCompiler.watch({
      aggregateTimeout: watchOptions.aggregateTimeout,
      poll: watchOptions.poll,
      ignored: ['src/**/*.scss']
    }, (err, stats) => {
      if (err) {
        console.error(err) // eslint-disable-line
      }
      console.log(stats.toString(devServerConfig.stats)) // eslint-disable-line
      handleServerBundleCompleted(stats)
    })

    process.on('exit', () => {
      if (server) {
        server.kill('SIGTERM')
      }
    })
  })
}

export default {
  name: 'start dev server',
  func: start
}
