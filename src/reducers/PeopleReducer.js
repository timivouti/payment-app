import { PEOPLE_FETCH } from '../actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case PEOPLE_FETCH:
      return action.payload;
    default:
      return state;
  }
};
