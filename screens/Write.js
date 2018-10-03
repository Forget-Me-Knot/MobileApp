import React, { Component } from 'react';
import firebase from '../firebase';
import { StyleSheet, View, TextInput, Button, Keyboard, Picker, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 15
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    margin: 20,
    alignContent: 'center'
  }
});

export default class Write extends Component {
  constructor(props) {
    super(props);
    this.state = { note: '', projects: [] };
    this.handlePress = this.handlePress.bind(this);
  }

  static navigatioOptions = {
    header: null
	};

	componentDidMount(){
		const self = this
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				let userProject = []
				var ref = firebase.database().ref('projects')
				ref.on('value', function(snapshot){
					let projects = snapshot.val()
					for (let key in projects){
						if ( projects[key].members ){
							const members = projects[key].members
							if ( members.includes(user.uid) ){
								userProject.push(projects[key].name)
							}
						}
					}
					self.setState({projects: userProject})
				})
			}
		})
	}

  handlePress() {
    const user = firebase.auth().currentUser;
    const noteid = Math.floor(Math.random() * 100000);
    firebase
      .database()
      .ref('notes/' + noteid)
      .set({
        author: user.uid,
        content: this.state.note
      });
    Keyboard.dismiss();
  }

  render() {
		const projects = this.state.projects
    return (
      <View style={styles.container}>
				<Picker
					selectedValue={this.state.project}
					itemStyle={{ height: 50, width: 200 }}
				  onValueChange={(project) => this.setState({project})}
				>
					{
						projects.map(project => (
							<Picker.Item label={project} value={project} key={project} />
						))
					}
				</Picker>
        <TextInput
          style={{
            width: 300,
            height: 200,
            backgroundColor: 'white',
            marginBottom: 20,
            padding: 5
          }}
          onChangeText={text => this.setState({ note: text })}
          value={this.state.note}
          multiline={true}
        />
        <Button
          title="POST"
          color="#841584"
          onPress={() => this.handlePress()}
        />
      </View>
    );
  }
}
