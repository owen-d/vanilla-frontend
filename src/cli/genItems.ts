#!/usr/bin/env node

import { Item } from '../lib/classicdb/item'
const meow = require('meow')
import { createWriteStream } from 'fs'
import { join } from 'path'
import { ensureDir } from 'fs-extra';
import * as request from 'request-promise'

export async function loadOne(id: number): Promise<Item> {
  return Item.from_id(`${id}`)
}
const cli = meow(`
some thing
`, {
    flags: {
      dst: {
        type: 'string',
        alias: 'd',
      }
    }
  })

run(cli.flags)

async function run(flags: { [name: string]: any }) {
  const maxItems = 23324
  const iconDir = join(flags.dst, 'icon')
  const ndjsonFile = join(flags.dst, 'items.ndjson')
  await ensureDir(iconDir)
  const jsonStream = createWriteStream(ndjsonFile)


  for (let i = 0; i < maxItems + 1; i++) {
    const item = await loadOne(i)
    if (item.thumbnail) {
      await request.get(item.thumbnail).pipe(createWriteStream(join(iconDir, `${i}.png`)))
    }
    jsonStream.write(item.toJSON())
    jsonStream.write('\n')
    console.log(`\nwrote ${i}`)
  }

}
