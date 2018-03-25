import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Payments from './components/Payments';
import Payment from './components/Payment';
import NewPayment from './components/NewPayment';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene
          titleStyle={{ alignSelf: 'center', marginLeft: 56 }}
          sceneStyle={styles.sceneStyle}
          key="payments"
          component={Payments}
          title="Payments"
          rightTitle="New Payment"
          onRight={() => Actions.newPayment()}
          initial
        />
        <Scene
          titleStyle={{ alignSelf: 'center', marginRight: 56 }}
          sceneStyle={styles.sceneStyle}
          key="payment"
          component={Payment}
          title="Payment"
        />
        <Scene
          titleStyle={{ alignSelf: 'center', marginRight: 56 }}
          sceneStyle={styles.sceneStyle}
          key="newPayment"
          component={NewPayment}
          title="Make a Payment"
        />
      </Scene>
    </Router>
  );
};

const styles = {
  sceneStyle: {
    paddingTop: 54
  }
};

export default RouterComponent;
