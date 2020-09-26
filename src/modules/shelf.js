import { handleActions, createAction } from 'redux-actions';
import { put, takeLatest, delay, call } from 'redux-saga/effects';

import * as shelfApi from '../api/shelf';

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
const ADD_BOOK_TO_SHELF_SUCCESS = 'shelves/ADD_BOOK_TO_SHELF_SUCCESS';
const ADD_BOOK_TO_SHELF_FAILURE = 'shelves/ADD_BOOK_TO_SHELF_FAILURE';

// action creator
export const shelfActions = {
  addShelf: createAction(ADD_SHELF),
  setShelves: createAction(SET_SHELVES),
  addBookToShelf: createAction(ADD_BOOK_TO_SHELF),
  setShelf: createAction(SET_SHELF),
};

// saga
function* addBookToShelfSaga(action) {}

// 여기 고치기
function* addShelfSaga(action) {
  const authorization = localStorage.getItem('authorization');
  const { data } = yield call(
    shelfApi.addNewShelf,
    authorization,
    action.payload
  );
  try {
    yield put({
      type: ADD_SHELF_SUCCESS,
      payload: data,
    });
    yield put({
      type: 'modal/SET_STATE',
      payload: {
        addShelfIsOpen: false,
      },
    });
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
    [ADD_BOOK_TO_SHELF_SUCCESS]: (prevState, action) => ({
      ...prevState,
    }),
  },
  initialState
);

export default shelfReducer;
