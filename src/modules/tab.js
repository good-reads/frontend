import { createAction, handleActions } from 'redux-actions';

// initial state
const initialState = {
  activeComponent: '0',
};

// action type
const SET_ACTIVE_COMPONENT_INDEX = 'tab/mypage/SET_ACTIVE_COMPONENT_INDEX';

// action creator
export const tabActions = {
  setActiveComponentIndex: createAction(SET_ACTIVE_COMPONENT_INDEX),
};

// reducer
const tabReducer = handleActions(
  {
    [SET_ACTIVE_COMPONENT_INDEX]: (prevState, action) => ({
      activeComponent: action.payload,
    }),
  },
  initialState
);

export default tabReducer;
