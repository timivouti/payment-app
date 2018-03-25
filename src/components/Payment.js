import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './common';

class Payment extends Component {
  renderPayment() {
    console.log(this.props.selectedPayment);
    const { textListName, textListItem, textListItemPriceSent, textListItemPriceReceived } = styles;
    const { selectedPayment, people } = this.props;
    const days = selectedPayment.transaction_date.substring(8, 10);
    const months = selectedPayment.transaction_date.substring(5, 7);
    const year = selectedPayment.transaction_date.substring(0, 4);

    function findReceiverName() {
      for (let i = 0; i < people.length; i++) {
        if (selectedPayment.receiver === people[i].phone_number) {
          return people[i].name;
        }
      }
    }

    function findSenderName() {
      for (let i = 0; i < people.length; i++) {
        if (selectedPayment.sender === people[i].phone_number) {
          return people[i].name;
        }
      }
    }

    if (selectedPayment.transaction_type === 0) {
      return (
        <View>
          <CardSection>
            <Text style={textListName}>Amount</Text>
            <Text style={textListItemPriceSent}>- {selectedPayment.amount}</Text>
          </CardSection>
          <CardSection>
            <Text style={textListName}>Receiver</Text>
            <Text style={textListItem}>{findReceiverName(selectedPayment.receiver)}</Text>
          </CardSection>
          <CardSection>
            <Text style={textListName}>Sender</Text>
            <Text style={textListItem}>{findSenderName(selectedPayment.sender)}</Text>
          </CardSection>
          <CardSection>
            <Text style={textListName}>Date</Text>
            <Text style={textListItem}>{`${days}.${months}.${year}`}</Text>
          </CardSection>
        </View>
      );
    }
    return (
      <View>
        <CardSection>
          <Text style={textListName}>Amount</Text>
          <Text style={textListItemPriceReceived}>+ {selectedPayment.amount}</Text>
        </CardSection>
        <CardSection>
          <Text style={textListName}>Receiver</Text>
          <Text style={textListItem}>{findReceiverName(selectedPayment.receiver)}</Text>
        </CardSection>
        <CardSection>
          <Text style={textListName}>Sender</Text>
          <Text style={textListItem}>{findSenderName(selectedPayment.sender)}</Text>
        </CardSection>
        <CardSection>
          <Text style={textListName}>Date</Text>
          <Text style={textListItem}>{`${days}.${months}.${year}`}</Text>
        </CardSection>
      </View>
    );
  }

  render() {
    return (
      <Card>
        {this.renderPayment()}
      </Card>
    );
  }
}

const styles = {
  textListName: {
    fontSize: 16,
    flex: 2
  },
  textListItem: {
    fontSize: 16,
    flex: 1
  },
  textListItemPriceSent: {
    fontSize: 16,
    flex: 1,
    color: 'red'
  },
  textListItemPriceReceived: {
    fontSize: 16,
    flex: 1,
    color: 'green'
  }
};

const mapStateToProps = (state) => {
  const { people, selectedPayment } = state;
  return { people, selectedPayment };
};

export default connect(mapStateToProps)(Payment);
