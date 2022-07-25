import { createWrapper } from 'next-redux-wrapper'
// TODO: replace this when I install @reduxjs/toolkit
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import type { Middleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import type { RootState } from '@/redux-types'

import combinedReducers from './reducers'

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
export const wrapper = createWrapper<Store<RootState>>(makeStore)
