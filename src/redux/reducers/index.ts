import { combineReducers } from 'redux'

import albumReducer from './albumReducer'
import appReducer from './appReducer'
import projectReducer from './projectReducer'
import settingsReducer from './settingReducer'
import userReducer from './userReducer'

const combinedReducers = combineReducers({
  album: albumReducer,
  app: appReducer,
  project: projectReducer,
  setting: settingsReducer,
  user: userReducer
})

export default combinedReducers
