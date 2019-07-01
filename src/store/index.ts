import * as tick from './tick/reducers'
import { combineReducers, createStore } from 'redux'

const rootReducer = combineReducers({
  tick: tick.reduce,
})

export type AppState = ReturnType<typeof rootReducer>

export function configureStore() {
  return createStore(rootReducer)
}
