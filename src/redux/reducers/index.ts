import { combineReducers } from 'redux'

import todoReducer from './todoReducer'

const combinedReducers = combineReducers({
  todo: todoReducer
})

export default combinedReducers
