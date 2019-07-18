import * as request from 'request-promise'
import express from 'express'
import { RequestError } from '../utils/error'


const byId = (url: string, id: string) => {
  return request.get({
    url: `${url}/_doc/${id}`,
    json: true,
  })
    .then(body => {
      return body['_source']
    })
}

export const byIdMiddleware =
  (esUrl: string) => (req: express.Request, res: express.Response, next: any) => {
    const id = req.params['id']

    if (!id) {
      const err = new RequestError('invalid query', 400)
      return next(err)
    }

    return byId(esUrl, id)
      .then(esResults => {
        res.status(200).json(esResults)
      })
      .catch(next)
  }
