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
