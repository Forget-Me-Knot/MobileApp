import React, { Component } from 'react';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import { View, Keyboard, TouchableOpacity } from 'react-native';
import firebase from '../firebase';

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(nav) {
    const email = this.state.email;
    const pass = this.state.pass;
    if (email && pass) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass)
        .catch(function(error) {
          console.error(error);
        });
      const userid = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref('users/' + userid)
        .set({
          displayName: this.state.name,
          email: email,
        });
    }
    this.setState = { email: '', pass: '' };
    Keyboard.dismiss();
    nav.navigate('Login');
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
          title="Sign up as a new user"
          style={{ justifyContent: 'center', alignContent: 'center' }}
        >
          <FormLabel>Name</FormLabel>
          <FormInput
            onChangeText={name => this.setState({ name })}
            inputStyle={{ width: undefined }}
          />

          <FormLabel>E-mail</FormLabel>
          <FormInput onChangeText={email => this.setState({ email })} />

          <FormLabel>Password</FormLabel>
          <FormInput
            onChangeText={pass => this.setState({ pass })}
            inputStyle={{ width: undefined }}
            secureTextEntry
          />

          <Button
            title="SIGN UP"
            buttonStyle={{
              width: '100%',
              height: 45,
              borderRadius: 5,
              marginTop: 10,
            }}
            onPress={() => this.handleSubmit(nav)}
          />
          <Button
            title="BACK TO LOGIN"
            buttonStyle={{
              width: '100%',
              height: 45,
              borderRadius: 5,
              marginTop: 10,
            }}
            onPress={() => nav.navigate('Login')}
          />
        </Card>
      </View>
    );
  }
}
