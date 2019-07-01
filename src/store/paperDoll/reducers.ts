import { Signal, Action, State } from './types'

const initialState = { equipped: {} }

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
      return {
        ...state,
        equipped: {
          ...state.equipped,
          [action.equipped.slot]: action.equipped.item,
        }
      }
  }
  return state
}
