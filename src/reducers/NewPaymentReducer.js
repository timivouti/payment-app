import { UPDATE_PAYMENT,
  PAYMENT_ERROR,
  NEWPAYMENT_SUCCESS,
  UPDATE_NUMBER,
  UPDATE_NAME
} from '../actions';

const INITIAL_STATE = { receiver:
  { phone_number: '', name: '' },
  amount: '',
  receiverError: '',
  amountError: '',
  receiverNameError: ''
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case UPDATE_PAYMENT:
      return { ...state, [action.payload.prop]: action.payload.value };
    case PAYMENT_ERROR:
      return { ...state, [action.payload.prop]: action.payload.value };
    case UPDATE_NUMBER:
      return { ...state, receiver: { ...state.receiver, phone_number: action.payload } };
    case UPDATE_NAME:
      return { ...state, receiver: { ...state.receiver, name: action.payload } };
    case NEWPAYMENT_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
