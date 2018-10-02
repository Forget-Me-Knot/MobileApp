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
						if (notes[key].author === user.uid) myNotes.push(notes[key]);
					}
					self.setState({ notes: myNotes });
				});
			} else {
				console.log('not logged in')
			}
		});
  }

  makeList(notes) {
    return notes.map(note => {
      return (
        <ListItem
          key={note.content + Math.random() * 1000}
          title={note.content}
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