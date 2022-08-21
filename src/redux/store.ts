import { createWrapper } from 'next-redux-wrapper'
import type { Store } from 'redux'

import type { RootState } from '@/redux-types'
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

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore)
