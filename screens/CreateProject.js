import React, { Component } from 'react'
import firebase from '../firebase'
import { View, Keyboard } from 'react-native';
import { Card, Button, FormLabel, FormInput} from 'react-native-elements';

export default class CreateProject extends Component {
	constructor(){
		super()
		this.state = {}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.randomColor = this.randomColor.bind(this)
	}

	randomColor(){
		let colors = [
			'ffa70e', '66ad6d', '80d2cb', '343ea3', 'b57cd2', 'bf5c8f', 'ff646d', 'fff600', '6affad', '80d2cb',
			'5982f7', '7069ca', 'f1b5ec', 'e1b198', '8387cc'
		]
		let n = Math.floor(Math.random() * colors.length)
		return colors[n]
	}

	handleSubmit(){
		const name = this.state.name
		const member = this.state.member
		const color = this.randomColor()
		firebase.auth().onAuthStateChanged(function(user) {
			const currentUser = user.email
			const newKey = firebase.database().ref('projects/').push().key
			firebase.database().ref('projects/' + newKey)
				.set({
					name,
					color,
					members: member ? [currentUser, ...member.split(',')] : [currentUser]
				})
		})
		Keyboard.dismiss()
		this.setState({name: '', member: ''})
	}

	render(){
		return (
			<View>
				<Card>
					<FormLabel>Project Name</FormLabel>
					<FormInput onChangeText={name => this.setState({name})} />

					<FormLabel>Members (use "," to add more than one)</FormLabel>
					<FormInput onChangeText={member => this.setState({member})} inputStyle={{width: undefined}} multiline />
				</Card>
				<Button
						title="CREATE"
						onPress={() => this.handleSubmit()}
					/>
			</View>
		)
	}
}
