import { combineReducers } from 'redux'

import projectReducer from './projectReducer'
import settingsReducer from './settingReducer'
import userReducer from './userReducer'

const combinedReducers = combineReducers({
  setting: settingsReducer,
  project: projectReducer,
  user: userReducer
})

export default combinedReducers
