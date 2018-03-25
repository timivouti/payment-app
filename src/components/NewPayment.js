import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, InputNumeric, Input } from './common';
import { paymentUpdate,
  newPaymentError,
  newPaymentSubmit,
  paymentNumberUpdate,
  paymentNameUpdate
} from '../actions';

class NewPayment extends Component {
  onPress() {
    const { receiver, amount } = this.props;

    if (!receiver.phone_number || receiver.phone_number.length < 3) {
      this.props.newPaymentError({ prop: 'receiverError', value: 'Phone number is invalid' });
    }
    if (!receiver.name || receiver.name.length < 3) {
      this.props.newPaymentError({ prop: 'receiverNameError', value: 'Name is invalid' });
    }
    if (!amount || amount.length < 1) {
      this.props.newPaymentError({ prop: 'amountError', value: 'Amount is invalid' });
    } else {
      this.props.newPaymentSubmit({ receiver, amount });
    }
  }

  printReceiverError() {
    const { textErrorStyle } = styles;
    if (this.props.receiverError !== '') {
      return (
        <CardSection>
          <Text style={textErrorStyle}>{this.props.receiverError}</Text>
        </CardSection>
      );
    }
  }

  printReceiverNameError() {
    const { textErrorStyle } = styles;
    if (this.props.receiverNameError !== '') {
      return (
        <CardSection>
          <Text style={textErrorStyle}>{this.props.receiverNameError}</Text>
        </CardSection>
      );
    }
  }

  printAmountError() {
    const { textErrorStyle } = styles;
    if (this.props.amountError !== '') {
      return (
        <CardSection>
          <Text style={textErrorStyle}>{this.props.amountError}</Text>
        </CardSection>
      );
    }
  }

  render() {
    return (
      <Card>
        <CardSection>
          <InputNumeric
            label="Receiver"
            placeholder="050 12341234"
            value={this.props.receiver.phone_number}
            onChangeText={value => this.props.paymentNumberUpdate({ value })}
          />
        </CardSection>
        {this.printReceiverError()}
        <CardSection>
          <Input
            label="Name"
            placeholder="John Doe"
            value={this.props.receiver.name}
            onChangeText={value => this.props.paymentNameUpdate({ value })}
          />
        </CardSection>
        {this.printReceiverNameError()}
        <CardSection>
          <InputNumeric
            label="Amount"
            placeholder="20.00"
            value={this.props.amount}
            onChangeText={value => this.props.paymentUpdate({ prop: 'amount', value })}
          />
        </CardSection>
        {this.printAmountError()}
        <CardSection>
          <Button onPress={() => this.onPress()}>
            Make Payment
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  textErrorStyle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    flex: 1
  }
};

const mapStateToProps = (state) => {
  const { receiver, amount, receiverError, receiverNameError, amountError } = state.newPayment;
  return { receiver, amount, receiverError, receiverNameError, amountError };
};

export default connect(mapStateToProps,
  { paymentUpdate,
    newPaymentError,
    newPaymentSubmit,
    paymentNumberUpdate,
    paymentNameUpdate })(NewPayment);
