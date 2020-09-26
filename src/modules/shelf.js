import { handleActions, createAction } from 'redux-actions';
import { put, takeLatest, call } from 'redux-saga/effects';

import * as shelfApi from '../api/shelf';
import { modalActions } from './modal';

// initial state
const initialState = {
  shelves: {},
  error: '',
};

// action type
const SET_SHELVES = 'shelves/SET_SHELVES';

const ADD_SHELF = 'shelves/ADD_SHELF';
const ADD_SHELF_SUCCESS = 'shelves/ADD_SHELF_SUCCESS';
const ADD_SHELF_FAILURE = 'shelves/ADD_SHELF_FAILURE';

const SET_SHELF = 'shelves/SET_SHELF';

const ADD_BOOK_TO_SHELF = 'shelves/ADD_BOOK_TO_SHELF';
const UPDATE_BOOK_TO_SHELF_SUCCESS = 'shelves/UPDATE_BOOK_TO_SHELF_SUCCESS';
const UPDATE_BOOK_TO_SHELF_FAILURE = 'shelves/UPDATE_BOOK_TO_SHELF_FAILURE';

const REMOVE_BOOK_FROM_SHELF = 'shelves/REMOVE_BOOK_FROM_SHELF';

// action creator
export const shelfActions = {
  addShelf: createAction(ADD_SHELF),
  setShelves: createAction(SET_SHELVES),
  addBookToShelf: createAction(ADD_BOOK_TO_SHELF),
  removeBookFromShelf: createAction(REMOVE_BOOK_FROM_SHELF),
  setShelf: createAction(SET_SHELF),
};

// saga
function* addBookToShelfSaga(action) {
  const authorization = localStorage.getItem('authorization');
  const { list_id, isbn } = action.payload;

  try {
    const { data } = yield call(
      shelfApi.addBookToShelf,
      authorization,
      list_id,
      isbn
    );

    yield put({
      type: UPDATE_BOOK_TO_SHELF_SUCCESS,
      payload: {
        id: data.id,
        data,
      },
    });
  } catch (error) {
    yield put({
      type: UPDATE_BOOK_TO_SHELF_FAILURE,
      payload: '문제가 발생했습니다',
    });
  }
}

function* removeBookFromShelfSaga(action) {
  const authorization = localStorage.getItem('authorization');
  const { list_id, isbn } = action.payload;

  try {
    const { data } = yield call(
      shelfApi.removeBookFromShelf,
      authorization,
      list_id,
      isbn
    );

    yield put({
      type: UPDATE_BOOK_TO_SHELF_SUCCESS,
      payload: {
        id: data.id,
        data,
      },
    });
  } catch (error) {
    yield put({
      type: UPDATE_BOOK_TO_SHELF_FAILURE,
      payload: '문제가 발생했습니다',
    });
  }
}

function* addShelfSaga(action) {
  const authorization = localStorage.getItem('authorization');
  try {
    const { data } = yield call(
      shelfApi.addNewShelf,
      authorization,
      action.payload
    );
    yield put({
      type: ADD_SHELF_SUCCESS,
      payload: data,
    });
    yield put(modalActions.setState({ addShelfIsOpen: false }));
  } catch (error) {
    yield put({
      type: ADD_SHELF_FAILURE,
      payload: error.response,
    });
  }
}

export function* shelfSaga() {
  yield takeLatest(ADD_SHELF, addShelfSaga);
  yield takeLatest(ADD_BOOK_TO_SHELF, addBookToShelfSaga);
  yield takeLatest(REMOVE_BOOK_FROM_SHELF, removeBookFromShelfSaga);
}

// reducer
const reducer = (acc, curr) => {
  const { id } = curr;
  acc[id] = curr;
  return acc;
};

const shelfReducer = handleActions(
  {
    [SET_SHELVES]: (prevState, action) => ({
      ...prevState,
      shelves: action.payload.reduce(reducer, {}),
    }),
    [ADD_SHELF_SUCCESS]: (prevState, action) => ({
      ...prevState,
      shelves: { ...prevState.shelves, [action.payload.id]: action.payload },
    }),
    [ADD_SHELF_FAILURE]: (prevState, action) => ({
      ...prevState,
      error: action.payload,
    }),
    [UPDATE_BOOK_TO_SHELF_SUCCESS]: (prevState, action) => ({
      ...prevState,
      shelves: {
        ...prevState.shelves,
        [action.payload.id]: {
          ...prevState.shelves[action.payload.id],
          ...action.payload.data,
        },
      },
    }),
    [UPDATE_BOOK_TO_SHELF_FAILURE]: (prevState, action) => ({
      ...prevState,
      error: action.payload,
    }),
  },
  initialState
);

export default shelfReducer;
