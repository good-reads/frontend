import { handleActions, createAction } from 'redux-actions';
import { put, takeLatest, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import { shelfActions } from './shelf';
import { modalActions } from './modal';
import * as userApi from '../api/user';

const BASE_URL =
  'http://ec2-54-180-154-184.ap-northeast-2.compute.amazonaws.com/api/accounts/auth';

// initial state
const initialState = {
  isSignIn: false,
  isLoading: false,
  informations: {
    name: '',
    thumbnail: '',
  },
  error: '',
};

// action type
const MAINTAIN = 'user/MAINTAIN';
const MAINTAIN_SUCCESS = 'user/MAINTAIN_SUCCESS';
const MAINTAIN_FAILURE = 'user/MAINTAIN_FAILURE';

//..signin
const SIGNIN = 'user/SIGNIN';
const SIGNIN_SUCCESS = 'user/SIGNIN_SUCCESS';
const SIGNIN_FAILURE = 'user/SIGNIN_FAILURE';

//..signup
const SIGNUP_REQUEST = 'user/SIGNUP_REQUEST';
const SIGNUP_SUCCESS = 'user/SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'user/SIGNUP_FAILURE';

//..signout
const SIGNOUT_REQUEST = 'user/SIGNOUT_REQUEST';
const SIGNOUT_SUCCESS = 'user/SIGNOUT_SUCCESS';
const SIGNOUT_FAILURE = 'user/SIGNOUT_FAILURE';

// action creator(sync)
export const signIn = createAction(SIGNIN);
const signInSuccess = createAction(SIGNIN_SUCCESS);
const signInFailure = createAction(SIGNIN_FAILURE);

export const maintain = createAction(MAINTAIN);
const maintainSuccess = createAction(MAINTAIN_SUCCESS);
const maintainFailure = createAction(MAINTAIN_FAILURE);

//..signup
const signUpRequest = createAction(SIGNUP_REQUEST);
const signUpSuccess = createAction(SIGNUP_SUCCESS);
const signUpFailure = createAction(SIGNUP_FAILURE);

//..signout
const signOutRequest = createAction(SIGNOUT_REQUEST);
const signOutSuccess = createAction(SIGNOUT_SUCCESS);
const signOutFailure = createAction(SIGNOUT_FAILURE);

function* maintainSaga() {
  const authorization = localStorage.getItem('authorization');
  try {
    const {
      data: { booklist, name, thumbnail },
    } = yield call(userApi.getUserInfo, authorization);
    yield put(maintainSuccess(name, thumbnail));
    yield put(shelfActions.setShelves(booklist));
  } catch (error) {
    yield put(maintainFailure(error.response.statusText));
  }
}

function* signInSaga(action) {
  try {
    const {
      data: { token },
    } = yield call(userApi.signIn, action.payload);

    const {
      data: { name, thumbnail, booklist },
    } = yield call(userApi.getUserInfo, token);
    yield put(shelfActions.setShelves(booklist));
    yield put(signInSuccess({ name, thumbnail }));
    yield put(modalActions.setState({ signInIsOpen: false }));
    localStorage.setItem('authorization', token);
  } catch (error) {
    yield put(signInFailure('아이디 또는 비밀번호를 확인해주세요'));
  }
}

export function* userSaga() {
  yield takeLatest(SIGNIN, signInSaga);
  yield takeLatest(MAINTAIN, maintainSaga);
}

export const signUp = userData => {
  return async (dispatch, getState) => {
    dispatch(signUpRequest());
    console.log('try signup: ', userData);
    try {
      const { data, status } = await axios.post(
        `${BASE_URL}/register/`,
        userData
      );
      console.log(data, status);
      dispatch(signUpSuccess());
      return { status };
    } catch (error) {
      const { status, data } = error.response;
      dispatch(signUpFailure());
      return { status, data };
    }
  };
};

export const signOut = () => {
  return async (dispatch, getState) => {
    dispatch(signOutRequest());

    try {
      const token = localStorage.getItem('authorization');
      localStorage.removeItem('authorization');
      const result = await axios.post(
        `${BASE_URL}/logout/`,
        {},
        {
          headers: {
            Authorization: 'Token ' + token,
          },
        }
      );
      dispatch(signOutSuccess());
      console.log(result);
    } catch (error) {
      dispatch(signOutFailure());
      console.log(error);
    }
  };
};

// reducer
const userReducer = handleActions(
  {
    //.. maintain
    [MAINTAIN_SUCCESS]: (prevState, action) => ({
      ...prevState,
      isSignIn: true,
      informations: action.payload,
      error: '',
    }),
    [MAINTAIN_FAILURE]: (prevState, action) => ({
      ...prevState,
      error: action.payload,
    }),
    //.. signin
    [SIGNIN]: (prevState, action) => ({
      ...prevState,
      isLoading: true,
      informations: action.payload,
    }),
    [SIGNIN_SUCCESS]: (prevState, action) => ({
      ...prevState,
      isSignIn: true,
      isLoading: false,
      error: '',
    }),
    [SIGNIN_FAILURE]: (prevState, action) => ({
      ...prevState,
      isSignIn: false,
      isLoading: false,
      error: action.payload,
    }),
    //.. signup
    [SIGNUP_REQUEST]: (prevState, action) => ({
      ...prevState,
      isLoading: true,
    }),
    [SIGNUP_SUCCESS]: (prevState, action) => ({
      ...prevState,
      isLoading: false,
    }),
    [SIGNUP_FAILURE]: (prevState, action) => ({
      ...prevState,
      isSignIn: false,
      isLoading: false,
    }),
    //.. signout
    [SIGNOUT_REQUEST]: (prevState, action) => ({
      ...prevState,
      isLoading: true,
      isSignIn: false,
      informations: {
        name: '',
        thumbnail: '',
      },
    }),
    [SIGNOUT_SUCCESS]: (prevState, action) => ({
      ...prevState,
      isLoading: false,
    }),
    [SIGNOUT_FAILURE]: (prevState, action) => ({
      ...prevState,
      isSignIn: false,
      isLoading: false,
    }),
  },
  initialState
);

export default userReducer;
