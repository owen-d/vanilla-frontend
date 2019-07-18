import * as request from 'request-promise'
import express from 'express'
import * as _ from 'lodash'
import { Query, isValid } from './types'
import { RequestError } from '../utils/error'

const search = (url: string, query: Query) => {
    const maxLength = 8
    let input: any = {
        size: maxLength,
        query: {
            bool: {
                must: {
                    multi_match: {
                        query: query.query,
                        type: 'bool_prefix',
                        fields: [
                            'name.completion',
                            'name.completion_2gram',
                            'name.completion_3gram',
                        ],
                    },
                },
                filter: query.slots ? {
                    terms: {
                        equipment_slot: query.slots,
                    },
                } : undefined,
            }
        },

    }

    return request.post({
        url: `${url}/_search`,
        body: input,
        json: true,
    })
        .then(body => {
            let results = _.get(body, ['hits', 'hits'] || [])
                .map((x: any) => x._source)
            return results
        })
}

export const searchMiddleware =
    (esUrl: string) => (req: express.Request, res: express.Response, next: any) => {
        const query: Query = req.body

        if (!isValid(query)) {
            const err = new RequestError('invalid query', 400)
            return next(err)
        }

        return search(esUrl, query)
            .then(esResults => {
                res.status(200).json(esResults)
            })
            .catch(next)
    }
