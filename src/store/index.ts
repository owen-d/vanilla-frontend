import * as tick from './tick/reducers'
import * as doll from './paperDoll/reducers'
import { combineReducers, createStore } from 'redux'

const rootReducer = combineReducers({
  tick: tick.reduce,
  doll: doll.reduce,
})

export type AppState = ReturnType<typeof rootReducer>

export function configureStore() {
  return createStore(rootReducer)
}
