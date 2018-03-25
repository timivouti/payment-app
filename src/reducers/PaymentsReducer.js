import _ from 'lodash';
import { PAYMENTS_FETCH } from '../actions';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case PAYMENTS_FETCH:
      return _.sortBy(action.payload, ['transaction_date']).reverse();
    default:
      return state;
  }
};
