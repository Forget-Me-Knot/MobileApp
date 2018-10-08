import React, { Component } from 'react';
import firebase from '../firebase';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class Notes extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      notes: [],
    };
    this.makeList = this.makeList.bind(this);
    this.deletenote = this.deletenote.bind(this);
  }

  componentDidMount() {
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const ref = firebase.database().ref();
        ref.on('value', function(snapshot) {
          let notes = [];
          let userProjects = [];
          colors = {};
          const allNotes = snapshot.val().notes;
          const projects = snapshot.val().projects;
          const users = snapshot.val().users;
          for (var key in projects) {
            if (projects[key].members.includes(user.email)) {
              userProjects.push(key);
              colors[key] = projects[key].color;
            }
          }
          for (var key in allNotes) {
            if (userProjects.includes(allNotes[key].projectId + '')) {
              let userName = '';
              for (var id in users) {
                if (id === allNotes[key].author) {
                  userName = users[id].displayName;
                }
              }
              notes.push({
                ...notes[key],
                content: allNotes[key].content,
                author: userName,
                key: key,
                color: colors[allNotes[key].projectId],
              });
            }
          }
          self.setState({ notes: notes });
        });
      } else {
        console.log('not logged in');
      }
    });
  }

  deletenote(key) {
    return firebase
      .database()
      .ref('notes')
      .child(key)
      .remove();
  }

  makeList(notes) {
    return notes.map(note => {
      return (
        <ListItem
          key={note.key}
          title={note.content}
          subtitle={`Author: ${note.author}`}
          titleNumberOfLines={0}
          rightIcon={{ name: 'delete', style: { marginRight: 10 } }}
          onPressRightIcon={() => this.deletenote(note.key)}
          leftIcon={{ name: 'lens', color: '#' + note.color }}
        />
      );
    });
  }

  render() {
    const notes = this.state.notes;
    return notes !== undefined ? (
      <ScrollView>{this.makeList(notes)}</ScrollView>
    ) : null;
  }
}
