import React, { Component } from 'react'
import { Card, Button, FormLabel, FormInput } from 'react-native-elements'
import { View, Keyboard } from 'react-native'
import firebase from '../firebase'

export default class SignUp extends Component {
	constructor(){
		super()
		this.state = {}
		this.handleSubmit = this.handleSubmit.bind(this)
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
    }
    this.setState = { email: '', pass: '' };
		Keyboard.dismiss();
		nav.navigate('Login')
	}

	render(){
		const nav = this.props.navigation
		return (
			<View style={{flexDirection: 'column', flex: 1, justifyContent: 'center', alignContent: 'center'}}>
				<Card title="Sign up as a new user" style={{justifyContent: 'center', alignContent: 'center'}}>
					<FormLabel>E-mail</FormLabel>
					<FormInput onChangeText={email => this.setState({ email })} />

					<FormLabel>Password</FormLabel>
					<FormInput onChangeText={pass => this.setState({ pass })} secureTextEntry />

					<Button title="SIGNUP" onPress={() => this.handleSubmit(nav)} />
					<Button title="Back to Login" onPress={() => nav.navigate('Login')} />
				</Card>
			</View>
		)
	}
}
