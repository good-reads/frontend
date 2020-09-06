import { handleActions, createAction } from 'redux-actions';

// initial state
const initialState = {
  isSignIn: true,
  isLoading: false,
};

// action type

// action creator(sync)
// action creator(async)

// reducer
const userReducer = handleActions({}, initialState);

export default userReducer;
