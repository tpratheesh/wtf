import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import liveMatchesReducer from './LiveMatchesReducer';
import upcomingMatchesReducer from './UpcomingMatchesReducer';
import userMatchTeamReducer from './UserMatchTeamReducer';

export default combineReducers({
  userReducer,
  liveMatchesReducer,
  upcomingMatchesReducer,
  userMatchTeamReducer
});