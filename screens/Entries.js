import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, List, ListItem } from "react-native-elements";
import firebase from '../firebase'

export default class Entries extends React.Component {
  static navigationOptions = {
    header: null
	};

	constructor(){
		super()
		this.state = {
			notes: []
		}
		this.makeList = this.makeList.bind(this)
	}

	componentDidMount(){
		const user = firebase.auth().currentUser
		var self = this
		var ref = firebase.database().ref('notes')
		ref.on('value', function(snapshot){
			var myNotes = []
			let notes = snapshot.val()
			for (var key in notes){
				if (notes[key].author === user.uid) myNotes.push(notes[key])
			}
			self.setState({notes: myNotes})
		})
	}

	makeList(notes){
		return notes.map(note => {
			return (
				<ListItem key={note.content + (Math.random() * 1000)} title={note.content} />
			)
		})
	}

  render() {
		const notes = this.state.notes
    return (
				notes !== undefined ?
				<ScrollView>{this.makeList(notes)}</ScrollView>
				: null
    );
  }
}
