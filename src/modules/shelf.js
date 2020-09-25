import { handleActions, createAction } from 'redux-actions';
import { put, takeLatest, delay, call } from 'redux-saga/effects';

import * as shelfApi from '../api/shelf';
import { modalActions } from './modal';

// initial state
const initialState = {
  shelves: [],
  error: '',
};

// action type
const SET_SHELVES = 'shelves/SET_SHELVES';
const ADD_SHELF = 'shelves/ADD_SHELF';
const ADD_SHELF_SUCCESS = 'shelves/ADD_SHELF_SUCCESS';
const ADD_SHELF_FAILURE = 'shelves/ADD_SHELF_FAILURE';

// action creator
export const shelfActions = {
  addShelf: createAction(ADD_SHELF),
  setShelves: createAction(SET_SHELVES),
};

// saga
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
}

// reducer
const shelfReducer = handleActions(
  {
    [SET_SHELVES]: (prevState, action) => ({
      ...prevState,
      shelves: action.payload,
    }),
    [ADD_SHELF_SUCCESS]: (prevState, action) => ({
      ...prevState,
      shelves: [...prevState.shelves, action.payload],
    }),
    [ADD_SHELF_FAILURE]: (prevState, action) => ({
      ...prevState,
      error: action.payload,
    }),
  },
  initialState
);

export default shelfReducer;
