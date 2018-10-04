import React, { Component } from 'react';
import firebase from '../firebase';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class Notes extends Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      notes: []
    };
		this.makeList = this.makeList.bind(this);
		this.deletenote = this.deletenote.bind(this)
  }

  componentDidMount() {
		var self = this;
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				const ref = firebase.database().ref()
				ref.on('value', function(snapshot) {
					let myNotes = []
					const notes = snapshot.val().notes
					const projects = snapshot.val().projects

					for (var key in notes) {
						if ( notes[key].author === user.uid ) {
							const projectId = notes[key].projectId
							for (var id in projects) {
								if ( id === projectId ) {
									const color = projects[id].color
									myNotes.push({...notes[key], key, color})
								}
							}
						}
					}
					self.setState({ notes: myNotes });
				})
			} else {
				console.log('not logged in')
			}
		});
	}

	deletenote(key){
		return firebase.database().ref('notes').child(key)
			.remove()
	}

  makeList(notes) {
    return notes.map(note => {
      return (
        <ListItem
          key={note.key}
					title={note.content}
					rightIcon={{name: 'delete', style: {marginRight: 10}}}
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
