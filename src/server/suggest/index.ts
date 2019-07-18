import { curry } from 'ramda'
import { Item } from '../../store/items/types'
import { readFile } from 'fs'
import { promisify } from 'util';
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
                        // TODO: find out why keywords are being normalized.
                        // for some reason, equipment slots seem to be mapping into lowercase,
                        // despite being of `keyword` types. It's hacky, but we handle it here.
                        equipment_slot: query.slots.map(x => x.toLowerCase()),
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
