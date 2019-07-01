import axios from 'axios'
import qs from 'query-string'
import { ItemSearchQuery, ItemSearchResult } from './typings'


function stringifyQuery(query: ItemSearchQuery): string {
  return qs.stringify({
    q: query.query + ' ' + query.slots.map(slot => `slot:${slot}`).join(' ')
  })
}


export async function suggest(input: ItemSearchQuery): Promise<ItemSearchResult[]> {
  return axios.get('https://itemization.info/complete', { params: stringifyQuery(input) })
    .then(resp => (resp.data as ItemSearchResult[]).map(
      r => ({ ...r, Icon: `https://itemization.info/icons/${r.Icon}` })
    ))

}
