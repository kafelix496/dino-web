import { combineReducers } from 'redux'

import albumReducer from './albumReducer'
import projectReducer from './projectReducer'
import settingsReducer from './settingReducer'
import userReducer from './userReducer'

const combinedReducers = combineReducers({
  setting: settingsReducer,
  project: projectReducer,
  user: userReducer,
  album: albumReducer
})

export default combinedReducers
