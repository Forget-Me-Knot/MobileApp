import React, { Component } from 'react';
import firebase from '../firebase';
import { View, Keyboard } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';

export default class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      member: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.randomColor = this.randomColor.bind(this);
  }

  randomColor() {
    let colors = [
			'6affad',
			'bb1f4b',
			'9cc2e9',
			'16941f',
			'6c1694',
			'ff6c00',
			'd88383',
			'b5ed7e',
			'7e9bed',
			'a294b7',
			'b3feff',
			'e2a9a9',
			'f8e4a0',
			'8f11e0',
			'c04d4d'
    ];
    let n = Math.floor(Math.random() * colors.length);
    return colors[n];
  }

  handleSubmit() {
    const nav = this.props.navigation;
    const name = this.state.name;
    const member = this.state.member;
    const color = this.randomColor();
    let newKey;
    let currentUser;
    firebase.auth().onAuthStateChanged(function(user) {
      currentUser = user.email;
      newKey = firebase
        .database()
        .ref('projects/')
        .push().key;
      firebase
        .database()
        .ref('projects/' + newKey)
        .set({
          name,
          color,
          members: member.length
            ? [currentUser, ...member.toLowerCase().split(',')]
            : [currentUser],
        });
      nav.navigate('ProjectHome', {
        project: {
          name: name,
          key: newKey,
          color: color,
          members: member.length
            ? [currentUser, ...member.toLowerCase().split(',')]
            : [currentUser],
        },
      });
    });
    Keyboard.dismiss();
    this.setState({ name: '', member: '' });
  }

  render() {
    return (
      <View>
        <Card>
          <FormLabel>Project Name</FormLabel>
          <FormInput onChangeText={name => this.setState({ name })} />

          <FormLabel>Members (use "," to add more than one)</FormLabel>
          <FormInput
            onChangeText={member => this.setState({ member })}
            inputStyle={{ width: undefined }}
            multiline
          />
        </Card>
        <Button
          title="CREATE"
          buttonStyle={{
            width: '100%',
            height: 45,
						marginTop: 10,
						backgroundColor: '#242424'
          }}
          onPress={() => {
            this.handleSubmit();
          }}
        />
      </View>
    );
  }
}
