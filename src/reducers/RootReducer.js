import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import liveMatchesReducer from './LiveMatchesReducer';

export default combineReducers({
  userReducer,
  liveMatchesReducer,
});