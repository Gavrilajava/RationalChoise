import {combineReducers} from 'redux'
import UserReducer from './userReducer'
import ComparsionReducer from './comparsionReducer'


const appReducer = combineReducers({UserReducer, ComparsionReducer})

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === "logout") {
    localStorage.clear()
    state = undefined;
  }
  return appReducer(state, action)
}


export default rootReducer