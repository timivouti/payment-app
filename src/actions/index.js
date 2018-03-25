import axios from 'axios';
import { Actions } from 'react-native-router-flux';

export const PAYMENTS_FETCH = 'payments_fetch';
export const PEOPLE_FETCH = 'people_fetch';
export const SELECTED_PAYMENT = 'selected_payment';
export const UPDATE_PAYMENT = 'update_payment';
export const PAYMENT_ERROR = 'payment_error';
export const NEWPAYMENT_SUCCESS = 'newpayment_success';

const PAYMENTS_URL = 'https://peaceful-stream-34212.herokuapp.com/transactions';
const PEOPLE_URL = 'https://peaceful-stream-34212.herokuapp.com/persons';

export const fetchPayments = () => {
  return (dispatch) => {
    return axios.get(PAYMENTS_URL)
      .then(response => paymentsFetchSuccess(dispatch, response));
  };
};

const paymentsFetchSuccess = (dispatch, payments) => {
  dispatch({
    type: PAYMENTS_FETCH,
    payload: payments.data
  });
};

export const fetchPeople = () => {
  return (dispatch) => {
    return axios.get(PEOPLE_URL)
      .then(response => peopleFetchSuccess(dispatch, response));
  };
};

const peopleFetchSuccess = (dispatch, people) => {
  dispatch({
    type: PEOPLE_FETCH,
    payload: people.data
  });
};

export const paymentSelected = (payment) => {
  Actions.payment();
  return {
    type: SELECTED_PAYMENT,
    payload: payment
  };
};

export const paymentUpdate = ({ prop, value }) => {
  return {
    type: UPDATE_PAYMENT,
    payload: { prop, value }
  };
};

export const newPaymentError = ({ prop, value }) => {
  return {
    type: PAYMENT_ERROR,
    payload: { prop, value }
  };
};

export const newPaymentSubmit = ({ receiver, amount }) => {
  return (dispatch) => {
    return axios.post(PAYMENTS_URL, {
      amount,
      receiver
    })
    .catch(err => console.log(err))
    .then(() => newPaymentSuccess(dispatch))
      .then(() => Actions.pop())
        .then(() => Actions.refresh({ refresh: true }));
  };
};

const newPaymentSuccess = (dispatch) => {
  dispatch({
    type: NEWPAYMENT_SUCCESS
  });
};
