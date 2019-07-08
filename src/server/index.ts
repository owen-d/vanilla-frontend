import express from 'express'
import bodyParser from 'body-parser'
import { config } from './config'
import { searchMiddleware } from './autocomplete'
import { join } from 'path'

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(err.code || 500)
  res.json({
    error: err.message || 'Internal Server Error',
  })
}

const main = async () => {
  //init
  const app = express()
  app.use(bodyParser.json())


  app.use('/assets/icon', express.static(config.iconDir))
  app.post('/api/autocomplete', searchMiddleware(`${config.esHost}/${config.esIndex}`))

  if (config.env === 'development') {
    // catch all for proxying to hot-reloading dev server
    app.get('/', function(req, res) {
      res.sendFile(join(__dirname, 'build', 'index.html'));
    });
  }

  app.use(errorHandler)

  app.listen(config.port)
  console.log(`listening on ${config.port}`)
}

main()
