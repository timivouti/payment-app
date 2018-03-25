import { combineReducers } from 'redux';
import PaymentsReducer from './PaymentsReducer';
import PeopleReducer from './PeopleReducer';
import SelectedPaymentReducer from './SelectedPaymentReducer';
import NewPaymentReducer from './NewPaymentReducer';

export default combineReducers({
  payments: PaymentsReducer,
  people: PeopleReducer,
  selectedPayment: SelectedPaymentReducer,
  newPayment: NewPaymentReducer
});
