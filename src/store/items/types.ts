import * as request from 'request-promise' // needed just to avoid some namespace issues in the generated vanillaApi client
import {
  CharacterClass,
  ItemBinding,
} from '../../lib/classicdb/types'
import { AttrIdentifier } from '../../lib/vanillaApi/'


// currently we only support parsing spell damage effects
export interface ScaledAttr {
  attr: AttrIdentifier
  scale: number
}

export interface Item {
  id: string
  name: string
  quality: ItemQuality
  unique: boolean
  binds_on: ItemBinding
  class_restrictions?: CharacterClass[]
  level_requirement?: number
  durability?: number
  primary_stats: PrimaryStat[]
  effects?: ScaledAttr[]
  armor?: number
  equipment_slot?: AowowSlot
  equipment_type?: string
  damage_range?: { low: number, high: number }
  swing_speed?: number
  dps?: number
  flavor_text?: string
}


export enum AowowSlot {
  Head = 'Head',
  Neck = 'Neck',
  Shoulders = 'Shoulder',
  Shirt = 'Shirt',
  Chest = 'Chest',
  Waist = 'Waist',
  Legs = 'Legs',
  Feet = 'Feet',
  Wrists = 'Wrist',
  Hands = 'Hands',
  Finger = 'Finger',
  Trinket = 'Trinket',
  Onehand = 'One-hand',
  Shield = 'Shield',
  Ranged = 'Ranged',
  Back = 'Back',
  Twohand = 'Two-hand',
  Relic = 'Relic',
  Mainhand = 'Main Hand',
  Offhand = 'Off Hand',
  HeldOffhand = 'Held In Off-Hand',
}

export const aowowSlots: AowowSlot[] = [
  AowowSlot.Head,
  AowowSlot.Neck,
  AowowSlot.Shoulders,
  AowowSlot.Shirt,
  AowowSlot.Chest,
  AowowSlot.Waist,
  AowowSlot.Legs,
  AowowSlot.Feet,
  AowowSlot.Wrists,
  AowowSlot.Hands,
  AowowSlot.Finger,
  AowowSlot.Trinket,
  AowowSlot.Onehand,
  AowowSlot.Shield,
  AowowSlot.Ranged,
  AowowSlot.Back,
  AowowSlot.Twohand,
  AowowSlot.Relic,
  AowowSlot.Mainhand,
  AowowSlot.Offhand,
  AowowSlot.HeldOffhand,
]

export interface PrimaryStat {
  amplitude: number
  sign: Sign
  stat: Stat
}

export type Sign = '+' | '-'

export type Stat = BaseAttr | Resist

export type BaseAttr
  = 'Strength'
  | 'Stamina'
  | 'Agility'
  | 'Spirit'
  | 'Intellect'

export const baseAttrs = [
  'Strength',
  'Stamina',
  'Agility',
  'Spirit',
  'Intellect',
]

export type School
  = AttrIdentifier.Arcane
  | AttrIdentifier.Fire
  | AttrIdentifier.Frost
  | AttrIdentifier.Holy
  | AttrIdentifier.Nature
  | AttrIdentifier.Shadow

export const schools: School[] = [
  AttrIdentifier.Arcane,
  AttrIdentifier.Fire,
  AttrIdentifier.Frost,
  AttrIdentifier.Holy,
  AttrIdentifier.Nature,
  AttrIdentifier.Shadow,
]

export const attrIdentifiers: AttrIdentifier[] = [
  ...schools,
  AttrIdentifier.SpellHit,
  AttrIdentifier.SpellCrit,
]

export type Resist = School

export enum ItemQuality {
  Poor = 'Poor',
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  Epic = 'Epic',
  Legendary = 'Legendary',
  Artifact = 'Artifact',
  Blizzard = 'Blizzard',
  None = '',
}
