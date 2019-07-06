#!/usr/bin/env node

import { Item } from '../lib/classicdb/item'
import { createWriteStream, createReadStream } from 'fs'
import { join, dirname } from 'path'
import { ensureDir } from 'fs-extra';
import { parseItem } from '../lib/itemParser/itemParser'
import { parse } from '../lib/itemParser/parserUtils';
const meow = require('meow')
const ndjson = require('ndjson')

const cli = meow(`
some thing
`, {
    flags: {
      in: {
        type: 'string',
        alias: 'i',
      },
      dst: {
        type: 'string',
        alias: 'd',
      }
    }
  })

run(cli.flags)


async function run(flags: { [name: string]: any }) {
  await ensureDir(dirname(flags.dst))
  const outFile = createWriteStream(flags.dst)

  const parser = ndjson.parse()
  parser.on('data', (item: Item) => {
    const parsed = parseItem(item)
    outFile.write(JSON.stringify(parsed))
    outFile.write('\n')
  })

  createReadStream(flags.in)
    .pipe(parser)
}
