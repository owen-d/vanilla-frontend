import { Item } from '../../store/items/types'
const axios = require('axios');

export function lookupItem(id: string): Promise<Item> {
  return axios({
    method: 'get',
    url: `/api/item/${id}`,
  }).then((x: { data: Item }) => x.data)
}
