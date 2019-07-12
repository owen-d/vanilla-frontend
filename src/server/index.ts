import express from 'express'
import bodyParser from 'body-parser'
import { config } from './config'
import { searchMiddleware } from './suggest/'
import { join } from 'path'

function errorHandler(
  err: { message: string, statusCode?: number },
  req: express.Request,
  res: express.Response, next: any
) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(err.statusCode || 500)
  res.json({
    error: err.message || 'Internal Server Error',
  })
}

const main = async () => {
  //init
  const app = express()
  app.use(bodyParser.json())


  app.post('/api/autocomplete', searchMiddleware(`${config.esHost}/${config.esIndex}`))


  // static routes
  app.use(express.static('build'))
  app.use('/assets/icon', express.static(config.iconDir))

  app.use(errorHandler)
  app.listen(config.port)
  console.log(`listening on ${config.port}`)
}

main()
