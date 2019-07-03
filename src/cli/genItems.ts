import { Item } from '../lib/classicdb/item'

export async function loadOne(id: number): Promise<Item> {
  return Item.from_id(`${id}`)
}

// 23324 max items

