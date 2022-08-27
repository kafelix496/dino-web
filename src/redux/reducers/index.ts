import { combineReducers } from 'redux'

import appReducer from './appReducer'
import projectReducer from './projectReducer'
import settingsReducer from './settingReducer'
import userReducer from './userReducer'

const combinedReducers = combineReducers({
  app: appReducer,
  project: projectReducer,
  setting: settingsReducer,
  user: userReducer
})

export default combinedReducers
