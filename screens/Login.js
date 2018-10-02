import React, { Component } from "react";
import firebase from "../firebase";
import { View, Keyboard, Alert } from "react-native";
import { Button, FormLabel, FormInput } from "react-native-elements";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.loginSubmit = this.loginSubmit.bind(this);
  }

  handleSubmit() {
    const email = this.state.email;
    const pass = this.state.pass;
    if (email && pass) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass)
        .catch(function(error) {
          console.error(error);
        });
    }
    this.setState = { email: '', pass: '' };
    Keyboard.dismiss();
	}

  loginSubmit(nav) {
    const email = this.state.email;
		const pass = this.state.pass;
    if (email && pass) {
      firebase
				.auth().signInWithEmailAndPassword(email, pass)
				.then(function(user){
					nav.navigate('Home')
				})
        .catch(function(error) {
					console.log(error.message)
				})
				.finally(function() {
				});
    }
    this.setState = { email: '', pass: '' };
    Keyboard.dismiss();
  }

  render() {
		const nav = this.props.navigation
    return (
      <View>
        <FormLabel>E-mail</FormLabel>
        <FormInput onChangeText={email => this.setState({ email })} />

        <FormLabel>Password</FormLabel>
        <FormInput
          onChangeText={pass => this.setState({ pass })}
          secureTextEntry
        />

        <Button title="SIGNUP" onPress={() => this.handleSubmit()} />
        <FormLabel>E-mail</FormLabel>
        <FormInput onChangeText={email => this.setState({ email })} />

        <FormLabel>Password</FormLabel>
        <FormInput
          onChangeText={pass => this.setState({ pass })}
          secureTextEntry
        />

        <Button title="LOGIN" onPress={() => this.loginSubmit(nav)} />
      </View>
    );
  }
}
