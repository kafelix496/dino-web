import { combineReducers } from 'redux'

import projectReducer from './projectReducer'
import settingsReducer from './settingReducer'

const combinedReducers = combineReducers({
  setting: settingsReducer,
  project: projectReducer
})

export default combinedReducers
