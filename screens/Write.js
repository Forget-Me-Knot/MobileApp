import React, { Component } from 'react';
import firebase from '../firebase';
import { View, TextInput, Keyboard, Picker } from 'react-native';
import { Card, Button, FormLabel } from 'react-native-elements';

export default class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: '',
      projects: [],
      selectedProject: '',
    };
    this.handlePress = this.handlePress.bind(this);
  }

  static navigatioOptions = {
    header: null,
  };

  componentDidMount() {
    const self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        let userProjects = [];
        var ref = firebase.database().ref('projects');
        ref.on('value', function(snapshot) {
          let projects = snapshot.val();
          for (let key in projects) {
            if (projects[key].members) {
              const members = projects[key].members;
              const name = projects[key].name;
              if (members.includes(user.email)) {
                userProjects.push({ name, key });
              }
            }
          }
          self.setState({
            projects: userProjects,
            selectedProject: userProjects[0].key,
          });
        });
      }
    });
  }

  handlePress() {
    const self = this;
    const user = firebase.auth().currentUser;
    const proj = this.state.selectedProject;
    const newKey = firebase
      .database()
      .ref('notes/')
      .push().key;
    firebase
      .database()
      .ref('notes/' + newKey)
      .set({
        author: user.uid,
        content: this.state.note,
        projectId: proj,
      })
      .then(function() {
        self.setState({ note: '' });
      });
    Keyboard.dismiss();
  }

  render() {
    const projects = this.state.projects;
    const nav = this.props.navigation;
    return (
      <View>
        <Card>
          <FormLabel>SELECT PROJECT: </FormLabel>
          <Picker
            selectedValue={this.state.selectedProject}
            itemStyle={{ height: 80, width: 200 }}
            onValueChange={selectedProject =>
              this.setState({ selectedProject })
            }
          >
            {projects.map(project => (
              <Picker.Item
                label={project.name}
                value={project.key}
                key={project.key}
              />
            ))}
          </Picker>
          <TextInput
            style={{
              width: '100%',
              height: 200,
              backgroundColor: 'white',
              marginBottom: 20,
              padding: 5,
            }}
            onChangeText={text => this.setState({ note: text })}
            value={this.state.note}
            multiline={true}
          />
          <Button
            title="POST"
            buttonStyle={{
              width: '100%',
              height: 45,
              borderRadius: 5,
              marginTop: 10,
            }}
            onPress={() => {
              this.handlePress();
              nav.navigate('Notes');
            }}
          />
        </Card>
      </View>
    );
  }
}
