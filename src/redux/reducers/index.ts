import { combineReducers } from 'redux'

import settingsReducer from './settingReducer'

const combinedReducers = combineReducers({
  setting: settingsReducer,
})

export default combinedReducers
