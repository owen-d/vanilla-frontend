import { Query } from '../../server/suggest/types'
import { Item } from '../../store/items/types'
const debounce = require('lodash/debounce')
const axios = require('axios');

export function suggester(
  wait: number = 0,
  opts: { leading: boolean, maxWait: number, trailing: boolean }
) {

  const suggest = (
    query: Query,
    cb: (items: Item[]) => undefined,
  ) => axios({
    method: 'post',
    url: '/api/autocomplete',
    data: query,
  })
    .then((resp: { data: Item[] }) => {
      cb(resp.data)
    })

  return debounce(suggest, wait, opts)
}
