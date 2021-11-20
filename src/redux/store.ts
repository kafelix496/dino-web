import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
import combinedReducers from './reducers'

import type { Middleware, Store } from 'redux'
import type { State } from '@/redux-types'

const bindMiddleware = (...middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware))
  }

  return applyMiddleware(...middleware)
}

// create a makeStore function
export const makeStore = () =>
  createStore(combinedReducers, bindMiddleware(thunk))

// export an assembled wrapper
export const wrapper = createWrapper<Store<State>>(makeStore)
