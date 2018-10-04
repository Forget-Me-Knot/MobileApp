import React, { Component } from 'react';
import firebase from '../firebase';
import { StyleSheet, View, TextInput, Button, Keyboard, Picker } from 'react-native';

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
    this.state = {
			note: '',
			projects: [],
			selectedProject: ''
		};
    this.handlePress = this.handlePress.bind(this);
  }

  static navigatioOptions = {
    header: null
	};

	componentDidMount(){
		const self = this
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				let userProjects = []
				var ref = firebase.database().ref('projects')
				ref.on('value', function(snapshot){
					let projects = snapshot.val()
					for (let key in projects){
						if ( projects[key].members ){
							const members = projects[key].members
							const name = projects[key].name
							if ( members.includes(user.email) ){
								userProjects.push({name, key})
							}
						}
					}
					self.setState({projects: userProjects})
				})
			}
		})
	}

  handlePress() {
		const user = firebase.auth().currentUser;
		const proj = this.state.selectedProject
		const newKey = firebase.database().ref('notes/').push().key
    firebase.database().ref('notes/' + newKey)
      .set({
        author: user.uid,
				content: this.state.note,
				projectId: proj
			});
		Keyboard.dismiss()
		this.setState({note: ''})
  }

  render() {
		const projects = this.state.projects
    return (
      <View style={styles.container}>
				<Picker
					selectedValue={this.state.selectedProject}
					itemStyle={{ height: 80, width: 200 }}
				  onValueChange={(selectedProject) => this.setState({selectedProject})}
				>
					{
						projects.map(project => (
							<Picker.Item label={project.name} value={project.key} key={project.key} />
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
