import { Item } from '../../store/items/types'

export enum Signal {
  Equip = 'EQUIP',
  Unequip = 'UNEQUIP',
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

export interface EquipAction {
  type: typeof Signal.Equip
  equipped: SlotEquipped
}

export interface UnequipAction {
  type: typeof Signal.Unequip
  slot: Slot
}

export interface SlotEquipped {
  slot: Slot
  item: Item
}

export type Equipped = Partial<Record<Slot, Item>>

export interface State {
  equipped: Equipped,
}

export type Action = EquipAction | UnequipAction
