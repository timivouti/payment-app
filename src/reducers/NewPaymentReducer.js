import { UPDATE_PAYMENT, PAYMENT_ERROR, NEWPAYMENT_SUCCESS } from '../actions';

const INITIAL_STATE = { receiver: '', amount: '', receiverError: '', amountError: '' };

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case UPDATE_PAYMENT:
      return { ...state, [action.payload.prop]: action.payload.value };
    case PAYMENT_ERROR:
      return { ...state, [action.payload.prop]: action.payload.value };
    case NEWPAYMENT_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
