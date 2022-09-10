import { combineReducers } from 'redux'

import appReducer from './appReducer'
import postReducer from './postReducer'
import projectReducer from './projectReducer'
import settingReducer from './settingReducer'

const combinedReducers = combineReducers({
  app: appReducer,
  post: postReducer,
  project: projectReducer,
  setting: settingReducer
})

export default combinedReducers
