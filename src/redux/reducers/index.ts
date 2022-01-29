import { combineReducers } from 'redux'

import settingsReducer from './settingsReducer'

const combinedReducers = combineReducers({
  settings: settingsReducer
})

export default combinedReducers
