import { Signal, Action, State, Equipped } from './types'
import { defaultSpec, defaultStats } from '../vanillaApi/types'
import { Stats } from '../../lib/vanillaApi';
import { calculateStats, baseDps } from './utils'


const initialState: State = {
  equipped: {},
  spec: defaultSpec,
  stats: defaultStats,
  dps: baseDps(defaultSpec),
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
      }
  }
  return state
}

