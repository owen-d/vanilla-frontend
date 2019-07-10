import * as tick from './tick/reducers'
import * as doll from './paperDoll/reducers'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { config } from './config/'

const rootReducer = combineReducers({
  tick: tick.reduce,
  doll: doll.reduce,
})

export type AppState = ReturnType<typeof rootReducer>

export const configureStore = () => createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument(config)),
)

