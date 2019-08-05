/**
 * demo
*/
import user from '../models/mysql/user'


let getDemo = async(input, req) => {
  global.logUtil.error(new Error('demo test22'), req, { method: `demoTest:${JSON.stringify(input)}` })
  await user.create({name: 'tests', mobile: '178234567'})
  return 'test2'
}


export default {
  getDemo
}
