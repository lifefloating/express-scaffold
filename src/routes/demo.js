/**
 * demo
 */
import { Router } from 'express'
import demoService from '../services/demo'

let router = new Router()

let getDemo = async(req, res, next) => {
  try {
    let input = {
      args1: req.body.args1,
      args2: req.body.args2
    }
    let result = await demoService.getDemo(input, req)
    return result
  } catch (err) {
    next(err)
  }
}

router.post('/getDemo', getDemo)

export default router
