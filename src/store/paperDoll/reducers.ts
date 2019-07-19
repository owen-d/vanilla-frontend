import { Signal, Action, State } from './types'
import { defaultSpec, defaultStats } from '../vanillaApi/types'
import { calculateStats, baseDps } from './utils'
import { createBrowserHistory } from 'history'


const initialState: State = {
  equipped: {},
  spec: defaultSpec,
  stats: defaultStats,
  dps: baseDps(defaultSpec),
  partialDerivatives: [],
  hist: createBrowserHistory(),
}

export function reduce(
  state = initialState,
  action: Action,
): State {
  switch (action.type) {
    case Signal.Unequip:
      return {
        ...state,
        equipped: {
          ...state.equipped,
          [action.slot]: undefined,
        }
      }

    case Signal.Equip:
      const equipped = {
        ...state.equipped,
        [action.equipped.slot]: action.equipped.item,
      }
      return {
        ...state,
        equipped,
        stats: calculateStats(equipped),
      }

    case Signal.SetDPS:
      return {
        ...state,
        dps: action.dps,
        partialDerivatives: action.partialDerivatives,
      }

    case Signal.SetSpec:
      return {
        ...state,
        spec: action.spec,
      }
  }
  return state
}

