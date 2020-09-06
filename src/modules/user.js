import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';

const BASE_URL =
  'http://ec2-54-180-154-184.ap-northeast-2.compute.amazonaws.com/api/accounts/auth';

// initial state
const initialState = {
  isSignIn: false,
  isLoading: false,
  id: -1,
};

// action type
//..signin
const SIGNIN_REQUEST = 'user/SIGNIN_REQUEST';
const SIGNIN_SUCCESS = 'user/SIGNIN_SUCCESS';
const SIGNIN_FAILURE = 'user/SIGNIN_FAILURE';

//..signup
const SIGNUP_REQUEST = 'user/SIGNUP_REQUEST';
const SIGNUP_SUCCESS = 'user/SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'user/SIGNUP_FAILURE';

//..signout
const SIGNOUT_REQUEST = 'user/SIGNOUT_REQUEST';
const SIGNOUT_SUCCESS = 'user/SIGNOUT_SUCCESS';

// action creator(sync)
//..signin
const signInRequest = createAction(SIGNIN_REQUEST);
const signInSuccess = createAction(SIGNIN_SUCCESS, id => id);
const signInFailure = createAction(SIGNIN_FAILURE);

//..signup
const signUpRequest = createAction(SIGNUP_REQUEST);
const signUpSuccess = createAction(SIGNUP_SUCCESS);
const signUpFailure = createAction(SIGNUP_FAILURE);

//..signout
const signOutRequest = createAction(SIGNOUT_REQUEST);
const signOutSuccess = createAction(SIGNOUT_SUCCESS);

// action creator(async)
const signIn = userData => {
  return async (dispatch, getState) => {
    dispatch(signInRequest());
    try {
      const { data, status } = await axios.post(`${BASE_URL}/login/`, userData);
      const { user_id, token } = data;
      dispatch(signInSuccess(user_id));
      localStorage.setItem('authorization', token);
    } catch (error) {
      const { status, statusText } = error.response;
      console.log(status, statusText);
      dispatch(signInFailure());
    }
  };
};

const signUp = userData => {
  return async (dispatch, getState) => {
    dispatch(signUpRequest());
    try {
      const { data, status } = await axios.post(
        `${BASE_URL}/register/`,
        userData
      );
      console.log(data, status);
      dispatch(signUpSuccess());
    } catch (error) {
      const { status, statusText } = error.response;
      console.log(status, statusText);
      dispatch(signUpFailure());
    }
  };
};

const signOut = () => {
  return async (dispatch, getState) => {
    dispatch(signOutRequest());
    setTimeout(() => {
      dispatch(signOutSuccess());
    }, 500);
  };
};

export { signIn, signUp, signOut };
// reducer
const userReducer = handleActions(
  {
    //.. signin
    [SIGNIN_REQUEST]: (prevState, action) => ({
      ...prevState,
      isLoading: true,
    }),
    [SIGNIN_SUCCESS]: (prevState, action) => ({
      ...prevState,
      isSignIn: true,
      isLoading: false,
      id: action.payload,
    }),
    [SIGNIN_FAILURE]: (prevState, action) => ({
      isSignIn: true,
      isLoading: false,
      id: -1,
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
    [SIGNIN_FAILURE]: (prevState, action) => ({
      ...prevState,
      isSignIn: false,
      isLoading: true,
    }),
    //.. signout
    [SIGNOUT_REQUEST]: (prevState, action) => ({
      ...prevState,
      id: -1,
      isLoading: true,
      isSignIn: false,
    }),
    [SIGNOUT_SUCCESS]: (prevState, action) => ({
      ...prevState,
      isLoading: false,
    }),
  },
  initialState
);

export default userReducer;
