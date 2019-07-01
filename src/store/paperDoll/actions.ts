import { Slot, Signal, SlotEquipped, Action } from './types'


export function equipItem(equipped: SlotEquipped): Action {
  return {
    type: Signal.Equip,
    equipped,
  }
}

export function unequipItem(slot: Slot): Action {
  return {
    type: Signal.Unequip,
    slot,
  }
}

export type Injections = {
  equipItem: typeof equipItem
  unequipItem: typeof unequipItem
}

export const injections: Injections = {
  equipItem,
  unequipItem,
}
