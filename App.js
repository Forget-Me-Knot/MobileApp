import React, { Component } from 'react';
import { createSwitchNavigator } from 'react-navigation';
import AppDrawerNavigator from './navigations/AppDrawerNavigator';
import Login from './screens/Login';
import Signup from './screens/SignUp';
import { Font } from 'expo';

const Router = createSwitchNavigator(
  {
    Login: Login,
    Signup: Signup,
    App: AppDrawerNavigator,
  },
  {
    initialRouteName: 'Login',
  }
);

console.disableYellowBox = true;

export default class App extends Component {
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
      Oxygen: require('./assets/fonts/Oxygen-Regular.ttf'),
      Abril: require('./assets/fonts/AbrilFatface-Regular.ttf'),
    });
  }

  render() {
    return <Router />;
  }
}
