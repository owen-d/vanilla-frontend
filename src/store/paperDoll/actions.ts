import { Slot, Signal, SlotEquipped, Action, StateGetter, PartialDerivative } from './types'
import { Dispatch } from 'redux'
import { Config } from '../config/'
import { toReqFields } from './utils'
import { DpsResponse } from '../../lib/vanillaApi/models/DpsResponse'
import { SpecIdentifier } from '../../lib/vanillaApi/models/SpecIdentifier'
import { fromEquipped } from './itemSignatures'
import qs from 'query-string'

const withQs = (updates: object) => {
  const parsed = qs.parse(window.location.search)
  return Object.assign({}, parsed, updates)
}


const equip = (equipped: SlotEquipped) => ({
  type: (Signal.Equip as Signal.Equip), // type assertion :'(
  equipped,
})

const fetchPartials = (dispatch: Dispatch<Action>, getState: StateGetter, { vanillaApi }: Config) => {
  const { doll: state } = getState()
  return vanillaApi.dpsPost({ body: toReqFields(state) })
    .then(resp => dispatch(setDPS(resp)))

}

export const equipItem = (equipped: SlotEquipped) =>
  (dispatch: Dispatch<Action>, getState: StateGetter, config: Config) => {

    dispatch(equip(equipped))

    // update querystring to reflect change
    const state = getState().doll
    state.hist.push({
      pathname: '/',
      search: qs.stringify(withQs({ gear: fromEquipped(state.equipped) })),
    })

    return fetchPartials(dispatch, getState, config)
  }

export function unequipItem(slot: Slot): Action {
  return {
    type: Signal.Unequip,
    slot,
  }
}

export const setDPS = ({ dps, partialDerivatives }: DpsResponse): Action => ({
  type: Signal.SetDPS,
  dps,
  partialDerivatives: (partialDerivatives as unknown) as PartialDerivative[],
})

export const setSpec = (spec: SpecIdentifier) =>
  (dispatch: Dispatch<Action>, getState: StateGetter, config: Config) => {
    dispatch({
      type: Signal.SetSpec,
      spec,
    })

    // update querystring to reflect change
    const state = getState().doll
    state.hist.push({
      pathname: '/',
      search: qs.stringify(withQs({ spec })),
    })

    return fetchPartials(dispatch, getState, config)
  }

export type Injections = {
  equipItem: typeof equipItem
  unequipItem: typeof unequipItem
  setDPS: typeof setDPS
  setSpec: typeof setSpec
}

export const injections: Injections = {
  equipItem,
  unequipItem,
  setDPS,
  setSpec,
}
