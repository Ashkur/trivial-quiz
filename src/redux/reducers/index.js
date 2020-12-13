import { combineReducers } from 'redux'
import questions from './questions'
import statistics from './statistics'

export default combineReducers({
  questions,
  statistics
})