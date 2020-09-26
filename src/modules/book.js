import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as bookApi from '../api/book';
import { modalActions } from './modal';

// initial state
const initialState = {
  error: '',
};

// action type
const ADD_NEW_BOOK = 'book/ADD_NEW_BOOK';
const ADD_NEW_BOOK_SUCCESS = 'book/ADD_NEW_BOOK_SUCCESS';
const ADD_NEW_BOOK_FAILURE = 'book/ADD_NEW_BOOK_FAILURE';

// action cretor (sync)
export const bookActions = {
  addNewBook: createAction(ADD_NEW_BOOK),
};

// saga
function* addNewBookSaga(action) {
  const authorization = localStorage.getItem('authorization');
  const { thumbnail, img, title, author, intro } = action.payload;
  try {
    const formData = new FormData();
    formData.append('img', img[0]);
    formData.append('thumbnail', thumbnail[0]);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('intro', intro);
    const { data } = yield call(bookApi.addNewBook, authorization, formData);
    console.log(data);
    yield put({ type: ADD_NEW_BOOK_SUCCESS });
    yield put(modalActions.setState({ addNewBookIsOpen: false }));
  } catch (error) {
    yield put({ type: ADD_NEW_BOOK_FAILURE, error: error.response });
  }
}

export function* bookSaga(action) {
  yield takeLatest(ADD_NEW_BOOK, addNewBookSaga);
}

// reducer
const bookReducer = handleActions(
  {
    [ADD_NEW_BOOK_FAILURE]: (prevState, action) => ({
      ...prevState,
      error: action.payload,
    }),
  },
  initialState
);
export default bookReducer;
