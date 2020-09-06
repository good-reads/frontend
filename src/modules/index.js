import { combineReducers } from 'redux';
import userReducer from './user';
import searchReducer from './search';

export default combineReducers({
  user: userReducer,
  search: searchReducer,
});
