/**
 * created by curdBoy
 */

import { makeDir, writeFile } from './libs/fs'
import pkg from '../package.json'
import config from './config'

async function copyEnvConfig(env) {
  await writeFile('src/env.json', JSON.stringify({ env }))
}

async function copyPkg() {
  await makeDir(`${config.dist}`)
  await writeFile(`${config.dist}/package.json`, JSON.stringify({
    name: pkg.name,
    private: true,
    engines: pkg.engines,
    dependencies: pkg.dependencies,
    scripts: {
      start: 'node server.js'
    }
  }, null, 2))
}


export var copyPkg = { // eslint-disable-line
  name: 'generate package.json',
  func: copyPkg
}

export var copyEnvConfig = { // eslint-disable-line
  name: 'generate env.json',
  func: copyEnvConfig
}
