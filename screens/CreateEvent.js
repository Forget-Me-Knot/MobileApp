import React, { Component } from 'react';
import firebase from '../firebase';
import { View, Text, TouchableOpacity, Picker } from 'react-native';
import { Card, Button, FormLabel, FormInput, Divider } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class CreateEvent extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      selectedProject: '',
      isDatePickerVisible: false,
      name: '',
      date: {
        dateString: '00',
        day: '00',
        month: '00',
        year: '00',
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
              const color = projects[key].color;
              if (members.includes(user.email)) {
                userProjects.push({ name, key, color });
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

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _handleDatePicked = date => {
    const dateString = date.toISOString().split('T')[0];
    const splitDate = dateString.split('-');
    this.setState({
      isDateTimePickerVisible: false,
      date: {
        dateString: dateString,
        day: splitDate[2],
        month: splitDate[1],
        year: splitDate[0],
      },
    });
  };

  handleSubmit() {
    const projId = this.state.selectedProject;
    let project;
    const curProj = firebase.database().ref('projects/' + projId);
    curProj.on('value', function(snapshot) {
      project = snapshot.val();
    });
    const newKey = firebase
      .database()
      .ref('notes/')
      .push().key;
    firebase
      .database()
      .ref('events/' + newKey)
      .set({
        color: project.color,
        date: {
          dateString: this.state.date.dateString,
          day: parseInt(this.state.date.day),
          month: parseInt(this.state.date.month),
          year: parseInt(this.state.date.year),
        },
        name: this.state.name,
        projectId: projId,
      });
  }

  render() {
    const projects = this.state.projects;
    const nav = this.props.navigation;
    return (
      <View>
        <Card containerStyle={{padding: 20, shadowOpacity: 0, shadowColor: 'white', borderWidth: 0}}>
					<FormLabel labelStyle={{color: 'black'}}>SELECT PROJECT</FormLabel>
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
          <FormLabel labelStyle={{color: 'black'}}>Event Name</FormLabel>
          <FormInput onChangeText={name => this.setState({ name })} />
          <FormLabel labelStyle={{color: 'black'}}>
            {'DATE: ' +
              this.state.date.month +
              '/' +
              this.state.date.day +
              '/' +
              this.state.date.year}
          </FormLabel>
					<Button
          title="SELECT DATE"
          buttonStyle={{
						alignContent: 'center',
            width: '100%',
            height: 45,
						marginTop: 10,
						backgroundColor: '#242424'
          }}
          onPress={() => this._showDateTimePicker()}
        />
        <Button
          title="CREATE EVENT"
          buttonStyle={{
            width: '100%',
            height: 45,
						marginTop: 10,
						backgroundColor: '#242424'
          }}
          onPress={() => {
            this.handleSubmit();
            nav.navigate('Calendar');
          }}
        />
        </Card>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={this._showDateTimePicker}>
            <Text>Show DatePicker</Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={() => this.setState({ isDateTimePickerVisible: false })}
          />
        </View>
      </View>
    );
  }
}
