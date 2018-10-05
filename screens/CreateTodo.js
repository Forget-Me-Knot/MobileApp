import React, { Component } from 'react';
import firebase from '../firebase';
import { View, Keyboard, Text, TouchableOpacity, Picker } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class CreateEvent extends Component {
  constructor() {
    super();
    this.state = {
      loadMembers: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMembers = this.getMembers.bind(this);
  }

  componentDidMount() {
    const self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      const ref = firebase.database().ref();
      ref.on('value', function(snapshot) {
        const projects = snapshot.val().projects;
        let myProjects = [];
        for (var key in projects) {
          if (projects[key].members.includes(user.email)) {
            const name = projects[key].name;
            const members = projects[key].members;
            myProjects.push({ name, members, key });
          }
        }
        self.setState({ projects: myProjects });
      });
    });
  }

  handleSubmit() {
    const nav = this.props.navigation;
    const self = this;
    const assigned = this.state.selectedMember;
    const projectId = parseInt(this.state.assignProjectId);
    const content = this.state.name;
    const newKey = firebase
      .database()
      .ref('tasks/')
      .push().key;
    const ref = firebase.database().ref('users');
    ref.on('value', function(snapshot) {
      const users = snapshot.val();
      let task;
      for (var key in users) {
        if (users[key].email === assigned) {
          task = {
            projectId,
            assigned: users[key].displayName,
            completed: false,
            content,
          };
        }
      }
      firebase
        .database()
        .ref('tasks')
        .child(newKey)
        .set(task);
      self.setState({
        todo: '',
        assignMember: '',
        assignProject: '',
      });
    });
    nav.navigate('Todo');
  }

  getMembers(project) {
    this.setState({ loadMembers: true });
    this.setState({ assignProject: project });
    const self = this;
    let members;
    const projects = this.state.projects;
    const name = project;
    projects.forEach(project => {
      if (name === project.name) {
        members = project.members;
        self.setState({ assignProjectId: project.key });
      }
    });
    this.setState({ members });
  }

  render() {
    const projects = this.state.projects;
    const members = this.state.members;
    const self = this;
    return (
      <View>
        <Card>
          <Picker
            selectedValue={this.state.selectedProject}
            itemStyle={{ height: 80, width: 200 }}
            onValueChange={selectedProject => {
              self.getMembers(selectedProject);
              self.setState({ selectedProject });
            }}
          >
            {projects
              ? projects.map(project => (
                  <Picker.Item
                    label={project.name}
                    value={project.name}
                    key={project.key}
                  />
                ))
              : null}
          </Picker>
          {this.state.loadMembers ? (
            <Picker
              selectedValue={this.state.selectedMember}
              itemStyle={{ height: 80, width: 200 }}
              onValueChange={selectedMember =>
                this.setState({ selectedMember })
              }
            >
              {members
                ? members.map(member => (
                    <Picker.Item label={member} value={member} key={member} />
                  ))
                : null}
            </Picker>
          ) : null}
          <FormLabel>Event Name</FormLabel>
          <FormInput onChangeText={name => this.setState({ name })} />
        </Card>

        <Button
          title="CREATE TO DO"
          buttonStyle={{
            width: '100%',
            height: 45,
            borderRadius: 5,
            marginTop: 10,
          }}
          onPress={() => {
            this.handleSubmit();
          }}
        />
      </View>
    );
  }
}
