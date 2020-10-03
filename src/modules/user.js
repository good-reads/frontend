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
  informations: {},
  error: '',
};

// action type
//.. change-password
const CHANGE_PASSWORD = 'user/CHANGE_PASSWORD';
const CHANGE_PASSWORD_SUCCESS = 'user/CHANGE_PASSWORD_SUCCESS';
const CHANGE_PASSWORD_FAILURE = 'user/CHANGE_PASSWORD_FAILURE';

//.. reset-error-message
const RESET_ERROR_MESSAGE = 'user/RESET_ERROR_MESSAGE';
const SET_ERROR_MESSAGE = 'user/SET_ERROR_MESSAGE';

//.. update-profile
const UPDATE_PROFILE = 'user/UPDATE_PROFILE';
const UPDATE_PROFILE_SUCCESS = 'user/UPDATE_PROFILE_SUCCESS';
const UPDATE_PROFILE_FAILURE = 'user/UPDATE_PROFILE_FAILURE';

//.. maintain
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
export const userActions = {
  resetErrorMessage: createAction(RESET_ERROR_MESSAGE),
  setErrorMessage: createAction(SET_ERROR_MESSAGE),
  updateProfile: createAction(UPDATE_PROFILE),
  maintain: createAction(MAINTAIN),
  signIn: createAction(SIGNIN),
  changePassword: createAction(CHANGE_PASSWORD),
};

//.. change-password
const changePasswordSuccess = createAction(CHANGE_PASSWORD_SUCCESS);
const changePasswordFailure = createAction(CHANGE_PASSWORD_FAILURE);

//.. maintain
const maintainSuccess = createAction(MAINTAIN_SUCCESS);
const maintainFailure = createAction(MAINTAIN_FAILURE);

//.. signin
const signInSuccess = createAction(SIGNIN_SUCCESS);
const signInFailure = createAction(SIGNIN_FAILURE);

//..signup
const signUpRequest = createAction(SIGNUP_REQUEST);
const signUpSuccess = createAction(SIGNUP_SUCCESS);
const signUpFailure = createAction(SIGNUP_FAILURE);

//..signout
const signOutRequest = createAction(SIGNOUT_REQUEST);
const signOutSuccess = createAction(SIGNOUT_SUCCESS);
const signOutFailure = createAction(SIGNOUT_FAILURE);

function* changePasswordSaga(action) {
  const authorization = localStorage.getItem('authorization');
  const password = action.payload;
  try {
    yield call(userApi.updatePassword, authorization, password);
    yield put(modalActions.setState({ changePasswordIsOpen: false }));
    yield put({
      type: RESET_ERROR_MESSAGE,
    });
    alert('비밀번호가 변경되었습니다');
  } catch (error) {
    const { non_field_errors } = error.response.data;
    yield put({
      type: SET_ERROR_MESSAGE,
      payload: non_field_errors[0],
    });
  }
}

function* updateProfileSaga(action) {
  const authorization = localStorage.getItem('authorization');
  const { thumbnail, email, name, cb } = action.payload;
  try {
    const formData = new FormData();
    thumbnail && formData.append('thumbnail', thumbnail[0]);
    email && formData.append('email', email);
    name && formData.append('name', name);
    const { data } = yield call(userApi.updateProfile, authorization, formData);
    yield put({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    cb && cb();
  } catch (error) {
    const { data } = error.response;
    yield put({
      type: UPDATE_PROFILE_FAILURE,
      payload: data[Object.keys(data)[0]][0],
    });
  }
}

function* maintainSaga() {
  const authorization = localStorage.getItem('authorization');
  try {
    const {
      data: { id, booklist, name, thumbnail, email },
    } = yield call(userApi.getUserInfo, authorization);
    yield put(maintainSuccess({ id, name, thumbnail, email }));
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
      data: { id, name, thumbnail, booklist, email },
    } = yield call(userApi.getUserInfo, token);
    yield put(shelfActions.setShelves(booklist));
    yield put(signInSuccess({ id, name, thumbnail, email }));
    yield put(modalActions.setState({ signInIsOpen: false }));
    localStorage.setItem('authorization', token);
  } catch (error) {
    yield put(signInFailure('아이디 또는 비밀번호를 확인해주세요'));
  }
}

export function* userSaga() {
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
  yield takeLatest(SIGNIN, signInSaga);
  yield takeLatest(MAINTAIN, maintainSaga);
  yield takeLatest(UPDATE_PROFILE, updateProfileSaga);
}

export const signUp = userData => {
  return async (dispatch, getState) => {
    dispatch(signUpRequest());
    try {
      const { data, status } = await axios.post(
        `${BASE_URL}/register/`,
        userData
      );
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
      localStorage.removeItem('authorization');
    } catch (error) {
      dispatch(signOutFailure());
      console.log(error);
    }
  };
};

// reducer
const userReducer = handleActions(
  {
    //.. set-error-message
    [SET_ERROR_MESSAGE]: (prevState, action) => ({
      ...prevState,
      error: action.payload,
    }),
    //.. reset-error-message
    [RESET_ERROR_MESSAGE]: (prevState, action) => ({
      ...prevState,
      error: '',
    }),
    //.. update-profile
    [UPDATE_PROFILE_SUCCESS]: (prevState, action) => ({
      ...prevState,
      informations: {
        ...prevState.informations,
        ...action.payload,
      },
    }),
    [UPDATE_PROFILE_FAILURE]: (prevState, action) => ({
      ...prevState,
      error: action.payload,
    }),
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
    }),
    [SIGNIN_SUCCESS]: (prevState, action) => ({
      ...prevState,
      isSignIn: true,
      isLoading: false,
      informations: action.payload,
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
