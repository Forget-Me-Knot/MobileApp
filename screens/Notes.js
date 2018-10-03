import React, { Component } from "react";
import firebase from "../firebase";
import { ScrollView } from "react-native";
import { ListItem } from "react-native-elements";

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
				var ref = firebase.database().ref("notes");
				ref.on("value", function(snapshot) {
					var myNotes = [];
					let notes = snapshot.val();
					for (var key in notes) {
						if (notes[key].author === user.uid) {
							myNotes.push({...notes[key], key: key});
						}
					}
					self.setState({ notes: myNotes });
				});
			} else {
				console.log('not logged in')
			}
		});
	}

	deletenote(key){
		return firebase.database().ref('notes').child(key)
			.remove();
	}

  makeList(notes) {
    return notes.map(note => {
      return (
        <ListItem
          key={note.content + Math.random() * 1000}
					title={note.content}
					rightIcon={{name: 'delete', style: {marginRight: 10}}}
					onPressRightIcon={() => this.deletenote(note.key)}
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
