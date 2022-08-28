import { combineReducers } from 'redux'

import appReducer from './appReducer'
import projectReducer from './projectReducer'
import settingsReducer from './settingReducer'

const combinedReducers = combineReducers({
  app: appReducer,
  project: projectReducer,
  setting: settingsReducer
})

export default combinedReducers
