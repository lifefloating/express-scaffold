/**
 * demo
 */
import { Router } from 'express'
import config from '../config'
// import demoService from '../services/demo'

let router = new Router()

// let getDemo = async(req, res, next) => {
//   try {
//     let input = {
//       args1: req.body.args1,
//       args2: req.body.args2
//     }
//     let result = await demoService.getDemo(input, req)
//     return result
//   } catch (err) {
//     next(err)
//   }
// }

// router.post('/getDemo', getDemo)
router.get('/', function (req, res) {
  res.json({ code: 0, message: config.test })
})

export default router
