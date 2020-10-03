import { setState } from './reducerUtils';
import { createAction, handleActions } from 'redux-actions';

// intial state
const initialState = {
  signUpIsOpen: false,
  signInIsOpen: false,
  addShelfIsOpen: false,
  addNewBookIsOpen: true,
  changePasswordIsOpen: false,
};

// action type
const SET_STATE = 'modal/SET_STATE';

// action creator (sync)
export const modalActions = {
  setState: createAction(SET_STATE),
};

// reducer
const modalReducer = handleActions(
  {
    [SET_STATE]: setState,
  },
  initialState
);

export default modalReducer;
