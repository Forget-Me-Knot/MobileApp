import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from '../firebase';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      project: {},
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const project = navigation.getParam('project');
        const ref = firebase.database().ref();
        ref.on('value', function(snapshot) {
          const users = snapshot.val().users;
          let projectMembers = [];
          for (var key in users) {
            if (project.members.includes(users[key].email)) {
              projectMembers.push(users[key]);
            }
          }
          self.setState({ members: projectMembers, project: project });
        });
      } else {
        console.log('not logged in');
      }
    });
  }

  render() {
    const project = this.state.project;
    const members = this.state.members;
    return (
      <View style={styles.container}>
        {project ? <Text>{project.name}</Text> : null}
        <Text>MEMBERS:</Text>
        {members.map(member => (
          <Text key={member.email}>{member.displayName}</Text>
        ))}
      </View>
    );
  }
}
