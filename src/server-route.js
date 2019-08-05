import demoRoute from './routes/demo'

export default (app) => {
  // api start here
  app.use('/demo', demoRoute)
  // app.use
}
