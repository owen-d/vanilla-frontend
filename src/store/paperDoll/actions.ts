import { Slot, Signal, SlotEquipped, Action, State, StateGetter } from './types'
import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { Config } from '../config/'
import { toReqFields } from './utils'


const equip = (equipped: SlotEquipped) => ({
  type: (Signal.Equip as Signal.Equip), // type assertion :'(
  equipped,
})

export const equipItem = (equipped: SlotEquipped) =>
  (dispatch: Dispatch<Action>, getState: StateGetter, { vanillaApi }: Config) => {

    dispatch(equip(equipped))
    const { doll: state } = getState()
    return vanillaApi.dpsPost(toReqFields(state))
      .then(resp => dispatch(setDPS(resp.data)))
  }

export function unequipItem(slot: Slot): Action {
  return {
    type: Signal.Unequip,
    slot,
  }
}

export const setDPS = (dps: number): Action => ({
  type: Signal.SetDPS,
  dps,
})


export type Injections = {
  equipItem: typeof equipItem
  unequipItem: typeof unequipItem
  setDPS: typeof setDPS
}

export const injections: Injections = {
  equipItem,
  unequipItem,
  setDPS,
}
