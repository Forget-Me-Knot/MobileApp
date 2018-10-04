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
			'433a8d', '438c96', '3c7e57', '881c2d', 'bd9946', '346dab', 'e48215', 'a32f26', 'aa857b', '883270',
			'9e76c0', '494f6a', '5b7e80', 'a38968', '809a68'
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
					members: member ? [currentUser, member] : [currentUser]
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

					<FormLabel>Members</FormLabel>
					<FormInput onChangeText={member => this.setState({member})} />
				</Card>
				<Button
						title="CREATE"
						onPress={() => this.handleSubmit()}
					/>
			</View>
		)
	}
}
