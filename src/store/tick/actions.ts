import { Signal, Action } from './types'

export function sendTick(): Action {
  return { type: Signal.Tick }
}

export type Injections = {
  sendTick: typeof sendTick
}

export const injections: Injections = {
  sendTick,
}

