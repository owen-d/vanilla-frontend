export enum Signal {
  Tick = 'TICK'
}

interface SendAction {
  type: typeof Signal.Tick
}

export interface State { }

export type Action = SendAction
