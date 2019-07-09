import { curry } from 'ramda'
import { Item } from '../../store/items/types'
import { readFile } from 'fs'
import { promisify } from 'util';
import * as request from 'request-promise'
import express from 'express'
import * as _ from 'lodash'
import { Query } from './types'


const search = (url: string, query: Query) => {
  let input: any = {
    size: 0,
    suggest: {
      itemSuggest: {
        prefix: query.query,
        completion: {
          field: 'name.completion',
          size: 50,
        },
      },
    }
  }

  return request.post({
    url: `${url}/_search`,
    body: input,
    json: true,
  })
    .then(body => {
      let results = _.get(body, ['suggest', 'itemSuggest', '0', 'options'] || [])
        .map((x: any) => x._source)

      if (query.slots) {
        results = results.filter(
          ({ equipment_slot }: Item) =>
            equipment_slot && (query.slots || []).indexOf(equipment_slot) !== -1
        )
      }

      const maxLength = 8
      return results.slice(0, maxLength)
    })
}

export const searchMiddleware =
  (esUrl: string) => (req: express.Request, res: express.Response, next: any) => {
    const query: Query = req.body
    return search(esUrl, query)
      .then(esResults => {
        res.status(200).json(esResults)
      })
      .catch(next)
  }
