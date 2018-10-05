import React, { Component } from 'react';
import { ScrollView, SafeAreaView, Text } from 'react-native';
import { Button, Avatar, CheckBox, List } from 'react-native-elements';
var firebase = require('firebase');

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const ref = firebase.database().ref();
        ref.on('value', function(snapshot) {
          const tasks = snapshot.val().tasks;
          const projects = snapshot.val().projects;

          let myProjects = [];
          let colors = {};
          let myTasks = [];
          for (var key in projects) {
            if (projects[key].members.includes(user.email)) {
              myProjects.push(key);
              colors[key] = projects[key].color;
            }
          }
          for (var id in tasks) {
            if (myProjects.includes(tasks[id].projectId + '')) {
              myTasks.push({
                ...tasks[id],
                key: id,
                color: colors[tasks[id].projectId],
              });
              self.setState({ [id]: tasks[id].completed });
            }
          }
          self.setState({ tasks: myTasks });
        });
      }
    });
  }

  handleSubmit() {
    const state = this.state;
    const deleted = [];
    for (var key in state) {
      if (state[key] === true) {
        deleted.push(key);
      }
    }
    deleted.map(todo => {
      return firebase
        .database()
        .ref('tasks')
        .child(todo)
        .remove();
    });
  }

  handleCheck(key) {
    firebase
      .database()
      .ref('tasks/' + key)
      .update({
        completed: !this.state[key],
      });
    this.setState({ [key]: !this.state[key] });
  }

  //make outside funcition. then bind to item.
  render() {
    const nav = this.props.navigation;
    const tasks = this.state.tasks;
    return (
      <SafeAreaView style={{ marginTop: 10 }}>
        <ScrollView>
          {tasks
            ? tasks.map(task => {
                return (
                  <List key={task.key}>
                    <CheckBox
                      title={task.content}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      containerStyle={{ backgroundColor: 'transparent' }}
                      checked={this.state[task.key]}
                      onPress={() => this.handleCheck(task.key)}
                    />
                    <Text>Assigned: {task.assigned}</Text>
                    <Avatar
                      rounded
                      containerStyle={{ marginRight: 0 }}
                      overlayContainerStyle={{
                        backgroundColor: `#${task.color}`,
                      }}
                    />
                  </List>
                );
              })
            : null}

          <Button
            title="NEW TO DO"
            buttonStyle={{
              width: '100%',
              height: 45,
              borderRadius: 5,
              marginTop: 10,
            }}
            onPress={() => {
              nav.navigate('CreateTodo');
            }}
          />
          <Button
            title="DELETE SELECTED"
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
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default ToDo;
