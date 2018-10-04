import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from '../firebase';

const styles = StyleSheet.create({
  container: {
		alignItems: 'center'
  }
});

export default class Home extends Component {
  static navigationOptions = {
    header: null
  };

	constructor(){
		super()
		this.state = {}
	}

	componentDidMount(){
		let message
		const date = new Date()
		const hour = date.getHours()
		if ( hour >= 6 && hour < 12 ) {
			message = 'Good morning.'
		} else if ( hour >= 12 && hour <= 14) {
			message = 'Lunch time!'
		} else if ( hour > 14 && hour <= 17 ) {
			message = 'Good afternoon.'
		} else if ( hour >= 18 ) {
			message = 'Good night.'
		}
		this.setState({message})

		const self = this
		const user = firebase.auth().currentUser
				const ref = firebase.database().ref('users/')
				ref.on('value', function(snapshot) {
					const users = snapshot.val()
					for (var key in users) {
						if (key === user.uid) self.setState({user: users[key].displayName})
					}
				})
	}

  render() {
		return (
      <View style={styles.container}>
				<Text>{this.state.message}</Text>
				<Text>{this.state.user}</Text>
      </View>
    );
  }
}
