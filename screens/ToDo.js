import React, { Component } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { Button, CheckBox, ListItem, List } from 'react-native-elements';
var firebase = require('firebase');

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._mounted = false;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  async componentDidMount() {
    this._mounted = true;
    var self = this;
    await firebase.auth().onAuthStateChanged(function(user) {
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

  componentWillUnmount() {
    this._mounted = false;
  }

  handleSubmit() {
    const state = this.state;
    const deleted = [];
    for (var key in state) {
      if (state[key] === true) {
        deleted.push(key);
        this.setState({ [key]: !this.state[key] });
      }
    }
    deleted.map(todo => {
      firebase
        .database()
        .ref('tasks')
        .child(todo)
        .remove();
    });
  }

  handleCheck(key) {
    this._mounted = true;
    firebase
      .database()
      .ref('tasks/' + key)
      .update({
        completed: !this.state[key],
      })
      .then(this.setState({ [key]: !this.state[key] }));
  }

  //make outside funcition. then bind to item.
  render() {
		console.log(this.state)
    const nav = this.props.navigation;
    const tasks = this.state.tasks;
    return (
      <SafeAreaView style={{ marginTop: 10 }}>
        <ScrollView>
          <List>
            {tasks
              ? tasks.map(task => {
                  return (
                    <ListItem
                      rightIcon={{ name: 'lens', color: '#' + task.color }}
                      key={task.key}
                      title={task.content}
                      subtitle={`Assigned: ${task.assigned}`}
                      leftIcon={
                        <CheckBox
                          containerStyle={{
                            marginLeft: 0,
                            marginRight: 0,
                            borderWidth: 0,
                            backgroundColor: 'white',
                          }}
                          checkedColor={'#' + task.color}
                          //checked={this.state.checked}
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="circle-o"
                          checked={this.state[task.key]}
                          onPress={() => this.handleCheck(task.key)}
                        />
                      }
                    />
                  );
                })
              : null}
          </List>
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
