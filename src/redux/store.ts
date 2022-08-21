import { configureStore } from '@reduxjs/toolkit'

import combinedReducers from './reducers'

// create a makeStore function
export const makeStore = () =>
  configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
  })

export const store = makeStore()
