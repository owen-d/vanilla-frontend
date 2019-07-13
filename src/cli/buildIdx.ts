#!/usr/bin/env node

const ndjson = require('ndjson')
import { promisify } from 'util'
import { Item } from '../store/items/types'
import { createReadStream, createWriteStream, writeFileSync } from 'fs'
import { Transform, Writable, pipeline as pipeline_ } from 'stream'
const pipeline = promisify(pipeline_)
import { ensureDir } from 'fs-extra';
import { dirname } from 'path'
import * as request from 'request-promise'
const flatten = require('lodash/flatten')
import { mappings } from './mappings'
import { index } from 'parsimmon';


const flags: {
  src: string,
  index: string,
  url: string,
} = require('minimist')(process.argv.slice(1), {
  string: ['src', 'index', 'url'],
  alias: { url: 'u' },
});


const run = async (flags: any) => {
  const parser = ndjson.parse()
  let records: Item[] = []
  await create(`${flags.url}/${flags.index}`)
  console.log('created idx')

  if (flags.src === '-') {
    createReadStream('', { fd: 0 })
      .pipe(parser)
  } else {
    createReadStream(flags.src)
      .pipe(parser)
  }

  parser.on('data', (item: Item) => {
    records.push(item)
  })

  parser.on('end', async () => {
    await flush(flags.url, flags.index, records)
    console.log('finished')
  })
}

async function create(url: string): Promise<any> {
  return request.put({
    url,
    json: true,
    body: {
      settings: {
        index: {
          number_of_shards: 1,
          number_of_replicas: 0
        }
      },
      mappings,
    }
  })
    .catch(e => {
      if (e.error.error.type !== 'resource_already_exists_exception') {
        throw e
      }
      console.log('index alread exists, recreating...')
      return request.del({ url })
        .then(() => create(url))
    })
}

const flush = (url: string, index: string, items: Item[]) => {

  const packElastic = (index: string, items: Item[]) =>
    flatten(
      items.map(item =>
        [
          JSON.stringify({ "index": { "_index": index, "_id": item.id } }),
          JSON.stringify(item),
        ]
      )
    )
      .join('\n') + '\n' // final newline

  return request.post({
    url: `${url}/_bulk`,
    headers: { 'Content-Type': 'application/x-ndjson' },
    body: packElastic(index, items),
  })
}



const main = async () => await run(flags)
main()


// .pipe(new Transform({
//   objectMode: true,
//   transform(chunk, _, done) {
//     console.log('hit', chunk.name)
//     done(null, chunk)
//   }
// }))
// .pipe(new Writable({
//   objectMode: true,
//   write(chunk, _, done) {
//     done()
//   }
// }))

