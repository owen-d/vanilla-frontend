import {
  CharacterClass,
  ItemBinding,
} from '../classicdb/types'
import { JSONRepr, Item } from '../classicdb/item'
import { primaryStatParser } from './statParser'
import { parseEffect } from './effectParser'
import { slotParser } from './slotParser'
import { parse } from './parserUtils'
import { Item as ParsedItem, ItemQuality, PrimaryStat } from '../../store/items/types'
import { qualityParser } from './qualityParser'
const flatten = require('lodash/flatten')


export function parseItem(item: Item): ParsedItem | undefined {

  const primaryStats = (item.primary_stats || []).map(
    s => parse(primaryStatParser, s)
  )
    .filter(x => x) as PrimaryStat[] // can't deduce that the filter removes undefined

  const effects = flatten(
    (item.effects || [])
      .map(
        s => parseEffect(s)
      )
  )

  const rarity = parse(qualityParser, item.quality_color) || ItemQuality.None

  const equipmentSlot = parse(slotParser, item.equipment_slot || '')

  let res: ParsedItem = {
    id: item.id,
    name: item.name,
    quality: rarity,
    unique: item.unique,
    binds_on: item.binds_on,
    class_restrictions: item.class_restrictions,
    level_requirement: item.level_requirement,
    durability: item.durability,
    armor: item.armor,
    equipment_type: item.equipment_type,
    damage_range: item.damage_range,
    swing_speed: item.swing_speed,
    dps: item.dps,
    flavor_text: item.flavor_text,
    primary_stats: primaryStats,
    effects: effects,
    equipment_slot: equipmentSlot,
  }

  return res
}
