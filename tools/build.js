/**
 * created by curdBoy
 */

import run from './run'
import clean from './clean'
import { copyPkg, copyEnvConfig } from './copy'
import buildServer from './build-server'
import { getEnv } from './libs/utils'

async function build() {
  const env = getEnv()
  await run(clean)
  await run(copyEnvConfig, env)
  await run(copyPkg)
  await run(buildServer, env)
}
export default {
  name: 'build',
  func: build
}
