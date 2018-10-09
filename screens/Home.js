import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import firebase from '../firebase';

class FadeView extends Component {
	constructor(){
		super()
		this.state = {
			fade: new Animated.Value(0)
		}
	}

	componentDidMount(){
		Animated.timing(
			this.state.fade,
			{
				toValue: 1,
				duration: 10000,
			}
		).start()
	}

	render() {
		let { fade } = this.state
		return (
			<Animated.View style={{...this.props.style, opacity: fade}}>
				{this.props.children}
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = { show: false };
  }

  componentDidMount() {
    let message;
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 6 && hour < 12) {
      message = 'Good morning';
    } else if (hour >= 12 && hour <= 14) {
      message = 'Lunch time';
    } else if (hour > 14 && hour <= 17) {
      message = 'Good afternoon';
    } else if (hour >= 18 && hour <= 22) {
      message = 'Good evening';
    } else {
			message = 'Good night'
		}
    this.setState({ message });
    const self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const ref = firebase.database().ref('users/');
        ref.on('value', function(snapshot) {
          const users = snapshot.val();
          for (var key in users) {
            if (key === user.uid) {
              self.setState({ user: users[key].displayName });
            }
          }
        });
      }
    });
  }

  render() {
		const user = this.state.user ? this.state.user : ' '
    return (
      <View style={styles.container}>
				<FadeView>
							<Text style={{fontSize: 20, textAlign: 'center', margin: 10}}>{this.state.message}</Text>
							<Text style={{fontSize: 20, textAlign: 'center', margin: 10}}>{user}</Text>
				</FadeView>
      </View>
    );
  }
}
