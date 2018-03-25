import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, InputNumeric } from './common';
import { paymentUpdate, newPaymentError, newPaymentSubmit } from '../actions';

class NewPayment extends Component {
  onPress() {
    const { receiver, amount } = this.props;

    if (!receiver || receiver.length < 9) {
      this.props.newPaymentError({ prop: 'receiverError', value: 'Receiver is invalid' });
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
            value={this.props.receiver}
            onChangeText={value => this.props.paymentUpdate({ prop: 'receiver', value })}
          />
        </CardSection>
        {this.printReceiverError()}
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
  const { receiver, amount, receiverError, amountError } = state.newPayment;
  return { receiver, amount, receiverError, amountError };
};

export default connect(mapStateToProps,
  { paymentUpdate, newPaymentError, newPaymentSubmit })(NewPayment);
