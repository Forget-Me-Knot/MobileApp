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
    this.state = {};
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const project = navigation.getParam('project');
    const ref = firebase.database().ref();
    let curProject;
    ref.on('value', function(snapshot) {
      const projects = snapshot.val().projects;
      for (var key in projects) {
        console.log(projects[key]);
        if (projects[key] === project.key) {
          curProject = projects[key];
        }
      }
      console.log('CUR', curProject);
    });
  }

  render() {
    const project = this.state.project;
    return (
      <View style={styles.container}>
        {project ? <Text>{project.name}</Text> : null}
      </View>
    );
  }
}
