import React, { Component } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { Button, CheckBox, ListItem, List } from 'react-native-elements';
var firebase = require('firebase');
import CreateTodo from './CreateTodo';

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      showForm: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.showFormChange = this.showFormChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  addTodo(task) {
    this.setState(prevState => ({ tasks: [...prevState, task] }));
  }

  componentDidMount() {
    var self = this;
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        const projects = await firebase
          .database()
          .ref('/projects')
          .once('value')
          .then(snap => snap.val());

        const tasks = await firebase
          .database()
          .ref('/tasks')
          .once('value')
          .then(snap => snap.val());
        let myProjects = new Set();
        let colors = {};
        let myTasks = [];
        for (let key in projects) {
          if (projects[key].members.includes(user.email)) {
            myProjects.add(key);
            colors[key] = projects[key].color;
          }
        }
        for (let id in tasks) {
          if (myProjects.has(tasks[id].projectId + '')) {
            myTasks.push({
              ...tasks[id],
              key: id,
              color: colors[tasks[id].projectId],
            });
            self.setState({ [id]: tasks[id].completed });
          }
        }
        self.setState({ tasks: myTasks });
      }
    });
  }

  handleSubmit() {
    const state = this.state;
    const deleted = [];
    for (let key in state) {
      if (state[key] === true) {
        deleted.push(key);
        this.setState(prevState => ({
          [key]: !this.state[key],
          tasks: prevState.tasks.filter(task => task.key !== key),
        }));
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

  showFormChange() {
    this.setState(prevState => ({ showForm: !prevState.showForm }));
  }

  async handleCheck(key) {
    const opposite = !this.state[key];
    const task = await firebase
      .database()
      .ref(`tasks/${key}`)
      .once('value')
      .then(snap => snap.val());
    const taskUpdate = {
      ...task,
      completed: opposite,
    };
    await firebase
      .database()
      .ref(`tasks/${key}`)
      .set(taskUpdate);
    this.setState({ [key]: opposite });
  }

  //make outside funcition. then bind to item.
  render() {
    const nav = this.props.navigation;
    const tasks = this.state.tasks;
    return (
      <SafeAreaView style={{ marginTop: 10 }}>
        {this.state.showForm ? (
          <CreateTodo
            addTodo={this.addTodo}
            showFormChange={this.showFormChange}
          />
        ) : null}
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
              this.setState({ showForm: true });
              // nav.navigate('CreateTodo');
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
