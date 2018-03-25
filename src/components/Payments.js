import React, { Component } from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './common';
import { fetchPayments, fetchPeople, paymentSelected } from '../actions';

class Payments extends Component {
  componentDidMount() {
    this.props.fetchPeople();
    this.props.fetchPayments();
  }

  onPress(payment) {
    this.props.paymentSelected(payment);
  }

  renderPayments(payment, people) {
    const { textMoneySent, textPerson, textTime, textMoneyReceived } = styles;
    const days = payment.transaction_date.substring(8, 10);
    const months = payment.transaction_date.substring(5, 7);
    const year = payment.transaction_date.substring(0, 4);

    function findReceiverName() {
      for (let i = 0; i < people.length; i++) {
        if (payment.receiver === people[i].phone_number) {
          return people[i].name;
        }
      }
    }

    function findSenderName() {
      for (let i = 0; i < people.length; i++) {
        if (payment.sender === people[i].phone_number) {
          return people[i].name;
        }
      }
    }

    if (payment.transaction_type === 0) {
      return (
        <TouchableOpacity key={payment.id} onPress={() => this.onPress(payment)}>
          <CardSection>
            <Text style={textTime}>{`${days}.${months}.${year}`}</Text>
            <Text style={textPerson}>{findReceiverName()}</Text>
            <Text style={textMoneySent}>- {payment.amount}</Text>
          </CardSection>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity key={payment.id} onPress={() => this.onPress(payment)}>
        <CardSection>
          <Text style={textTime}>{`${days}.${months}.${year}`}</Text>
          <Text style={textPerson}>{findSenderName()}</Text>
          <Text style={textMoneyReceived}>+ {payment.amount}</Text>
        </CardSection>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView>
        <Card>
          {this.props.payments.map(payment =>
            this.renderPayments(payment, this.props.people))}
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  textMoneySent: {
    fontSize: 16,
    color: 'red',
    flex: 0.5
  },
  textMoneyReceived: {
    fontSize: 16,
    color: 'green',
    flex: 0.5
  },
  textPerson: {
    fontSize: 16,
    flex: 1
  },
  textTime: {
    fontSize: 16,
    flex: 1
  }
};

const mapStateToProps = (state) => {
  const { payments, people, selectedPayment } = state;
  return { payments, people, selectedPayment };
};

export default connect(mapStateToProps,
  { fetchPayments, fetchPeople, paymentSelected })(Payments);
