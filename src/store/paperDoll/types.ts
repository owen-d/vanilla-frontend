import { Item } from '../../store/items/types'
import { Stats, SpecIdentifier } from '../../lib/vanillaApi/api'

export enum Signal {
  Equip = 'EQUIP',
  Unequip = 'UNEQUIP',
  SetDPS = 'SETDPS',
}

export enum Slot {
  Head = 'Head',
  Gloves = 'Gloves',
  Neck = 'Neck',
  Belt = 'Belt',
  Shoulders = 'Shoulders',
  Pants = 'Pants',
  Cloak = 'Cloak',
  Boots = 'Boots',
  Chest = 'Chest',
  Ring1 = 'Ring1',
  Ring2 = 'Ring2',
  Trinket1 = 'Trinket1',
  Bracers = 'Bracers',
  Trinket2 = 'Trinket2',
  Mainhand = 'Mainhand',
  Offhand = 'Offhand',
  Ranged = 'Ranged',
}

export const slots: Slot[] = [
  Slot.Head,
  Slot.Gloves,
  Slot.Neck,
  Slot.Belt,
  Slot.Shoulders,
  Slot.Pants,
  Slot.Cloak,
  Slot.Boots,
  Slot.Chest,
  Slot.Ring1,
  Slot.Ring2,
  Slot.Trinket1,
  Slot.Bracers,
  Slot.Trinket2,
  Slot.Mainhand,
  Slot.Offhand,
  Slot.Ranged,
]

export interface EquipAction {
  type: typeof Signal.Equip
  equipped: SlotEquipped
}

export interface UnequipAction {
  type: typeof Signal.Unequip
  slot: Slot
}

export interface SetDPSAction {
  type: typeof Signal.SetDPS,
  dps: number,
}

export interface SlotEquipped {
  slot: Slot
  item: Item
}

export type Equipped = Partial<Record<Slot, Item>>

export type StateGetter = () => State

export interface State {
  equipped: Equipped,
  spec: SpecIdentifier,
  stats: Stats,
  dps: number,
}

export type Action = EquipAction | UnequipAction | SetDPSAction
