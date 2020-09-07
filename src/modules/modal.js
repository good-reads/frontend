import { createAction, handleActions } from 'redux-actions';

// intial state
const initialState = {
  signUpIsOpen: false,
  signInIsOpen: false,
};

// action type
const SET_SIGNIN_MODAL_OPEN = 'modal/SET_SIGNIN_MODAL_OPEN';
const SET_SIGNIN_MODAL_CLOSE = 'modal/SET_SIGNIN_MODAL_CLOSE';
const SET_SIGNUP_MODAL_OPEN = 'modal/SET_SIGNUP_MODAL_OPEN';
const SET_SIGNUP_MODAL_CLOSE = 'modal/SET_SIGNUP_MODAL_CLOSE';

// action creator (sync)
const signUpModalOpen = createAction(SET_SIGNUP_MODAL_OPEN);

const signUpModalClose = createAction(SET_SIGNUP_MODAL_CLOSE);
const signInModalOpen = createAction(SET_SIGNIN_MODAL_OPEN);
const signInModalClose = createAction(SET_SIGNIN_MODAL_CLOSE);

export { signUpModalOpen, signUpModalClose, signInModalOpen, signInModalClose };

// reducer
const modalReducer = handleActions(
  {
    [SET_SIGNIN_MODAL_OPEN]: (prevState, action) => ({
      ...prevState,
      signInIsOpen: true,
    }),
    [SET_SIGNIN_MODAL_CLOSE]: (prevState, action) => ({
      ...prevState,
      signInIsOpen: false,
    }),
    [SET_SIGNUP_MODAL_OPEN]: (prevState, action) => ({
      ...prevState,
      signUpIsOpen: true,
    }),
    [SET_SIGNUP_MODAL_CLOSE]: (prevState, action) => ({
      ...prevState,
      signUpIsOpen: false,
    }),
  },
  initialState
);

export default modalReducer;
