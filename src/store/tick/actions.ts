import { Signal, Action } from './types'

export function sendTick(): Action {
  return { type: Signal.Tick }
}
