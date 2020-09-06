import { combineReducers } from 'redux';
import userReducer from './user';
import searchReducer from './search';
import modalReducer from './modal';

export default combineReducers({
  user: userReducer,
  search: searchReducer,
  modal: modalReducer,
});
