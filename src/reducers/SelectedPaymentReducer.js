import { SELECTED_PAYMENT } from '../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case SELECTED_PAYMENT:
      return action.payload;
    default:
      return state;
  }
};
