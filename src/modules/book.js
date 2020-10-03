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

const SET_ERROR_MESSAGE = 'book/SET_ERROR_MESSAGE';

// action cretor (sync)
export const bookActions = {
  addNewBook: createAction(ADD_NEW_BOOK),
  setErrorMessage: createAction(SET_ERROR_MESSAGE),
};

// saga
function* addNewBookSaga(action) {
  const authorization = localStorage.getItem('authorization');
  const {
    title,
    author,
    cover,
    pubdate,
    isbn,
    description,
    publisher,
    cb,
  } = action.payload;
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('cover', cover[0]);
    formData.append('pubdate', pubdate.replace(/[-]/g, ''));
    formData.append('isbn', isbn);
    formData.append('description', description);
    formData.append('publisher', publisher);
    yield call(bookApi.addNewBook, authorization, formData);
    yield put({ type: ADD_NEW_BOOK_SUCCESS });
    yield put(modalActions.setState({ addNewBookIsOpen: false }));
    alert('책이 추가되었습니다');
    cb();
  } catch (error) {
    const { data } = error.response;
    yield put({ type: ADD_NEW_BOOK_FAILURE, payload: data.isbn[0] });
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
    [SET_ERROR_MESSAGE]: (prevState, action) => ({
      ...prevState,
      error: action.payload,
    }),
  },
  initialState
);
export default bookReducer;
