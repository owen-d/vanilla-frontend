export enum Signal {
  Tick = 'TICK'
}

interface SendTickAction {
  type: typeof Signal.Tick
}

export interface State { }

export type Action = SendTickAction
