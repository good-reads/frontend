import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';

const BASE_URL =
  'http://ec2-54-180-154-184.ap-northeast-2.compute.amazonaws.com/api/accounts/auth';

// initial state
const initialState = {
  isSignIn: false,
  isLoading: false,
  informations: {
    id: -1,
    name: '',
    thumbnail: '',
  },
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
const SIGNOUT_FAILURE = 'user/SIGNOUT_FAILURE';

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
const signOutFailure = createAction(SIGNOUT_FAILURE);

// action creator(async)
const signIn = userData => {
  return async (dispatch, getState) => {
    dispatch(signInRequest());
    try {
      const loginRequestResult = await axios.post(
        `${BASE_URL}/login/`,
        userData
      );
      const { data, status } = loginRequestResult;
      const { token } = data;

      const userInformations = await axios.get(`${BASE_URL}/account/get/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const { name, thumbnail, id } = userInformations.data;
      dispatch(signInSuccess({ id, name, thumbnail }));
      localStorage.setItem('authorization', token);
      return { status };
    } catch (error) {
      const { status } = error.response;
      console.log(error.response);
      dispatch(signInFailure());
      return { status };
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
      return { status };
    } catch (error) {
      const { status, data } = error.response;
      dispatch(signUpFailure());
      return { status, data };
    }
  };
};

const signOut = () => {
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
      informations: action.payload,
    }),
    [SIGNIN_FAILURE]: (prevState, action) => ({
      ...prevState,
      isSignIn: false,
      isLoading: false,
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
        id: -1,
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
