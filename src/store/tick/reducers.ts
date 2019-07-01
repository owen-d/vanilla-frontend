import { Signal, Action, State } from './types'

const initialState: State = {}

export function reduce(
  state = initialState,
  action: Action
): State {
  switch (action.type) {
    case Signal.Tick:
      return state
  }
  return state
}
