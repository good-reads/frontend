import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import userReducer, { userSaga } from './user';
import searchReducer from './search';
import modalReducer from './modal';
import shelfReducer, { shelfSaga } from './shelf';

export default combineReducers({
  user: userReducer,
  search: searchReducer,
  modal: modalReducer,
  shelf: shelfReducer,
});

export function* rootSaga() {
  yield all([shelfSaga(), userSaga()]);
}
