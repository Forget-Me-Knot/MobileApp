import React, { Component } from 'react';
import firebase from '../firebase';
import { View, Keyboard } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {};
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  loginSubmit(nav) {
    const email = this.state.email.toLowerCase();
    const pass = this.state.pass.toLowerCase();
    if (email && pass) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then(function(user) {
          nav.navigate('App');
        })
        .catch(function(error) {
          console.log(error.message);
        });
    }
    this.setState = { email: '', pass: '' };
    Keyboard.dismiss();
  }

  render() {
    const nav = this.props.navigation;
    return (
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Card
          title="Forget-Me-Knot"
          style={{ justifyContent: 'center', alignContent: 'center'}}
        >
          <FormLabel>E-mail</FormLabel>
          <FormInput
            onChangeText={email => this.setState({ email })}
            inputStyle={{ width: undefined }}
          />

          <FormLabel>Password</FormLabel>
          <FormInput
            inputStyle={{ width: undefined }}
            onChangeText={pass => this.setState({ pass })}
            secureTextEntry
          />

          <Button
            title="LOGIN"
            buttonStyle={{
              width: '100%',
              height: 45,
							marginTop: 10,
							backgroundColor: '#242424'
            }}
            onPress={() => this.loginSubmit(nav)}
          />
          <Button
            buttonStyle={{
              width: '100%',
              height: 45,
							marginTop: 10,
							backgroundColor: '#242424'
            }}
            title="SIGN UP AS NEW USER"
            onPress={() => nav.navigate('Signup')}
          />
          <Button
            title="HOME"
            buttonStyle={{
              width: '100%',
              height: 45,
							marginTop: 10,
							backgroundColor: '#242424'
            }}
            onPress={() => nav.navigate('App')}
          />
        </Card>
      </View>
    );
  }
}
