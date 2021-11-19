import { combineReducers } from 'redux'

import themeReducer from './themeReducer'

const combinedReducers = combineReducers({
  theme: themeReducer
})

export default combinedReducers
