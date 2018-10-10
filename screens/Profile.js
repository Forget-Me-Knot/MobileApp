import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import firebase from '../firebase';
import { Card, Button, ListItem, List, Text, Divider } from 'react-native-elements';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getProjects = this.getProjects.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  async componentDidMount() {
    const self = this;
    const userId = firebase.auth().currentUser.uid;
    let user;
    await firebase
      .database()
      .ref('/users/' + userId)
      .once('value')
      .then(function(snapshot) {
        user = snapshot.val() && snapshot.val();
        self.setState({ user });
      });
    this.getProjects();
  }

  getProjects() {
    const self = this;
    let allProjects;
    const email = this.state.user.email;
    var ref = firebase.database().ref('projects');
    ref.on('value', function(snapshot) {
      let projects = snapshot.val();
      allProjects = [];
      for (let key in projects) {
        if (projects[key].members) {
          const members = projects[key].members;
          const name = projects[key].name;
          const color = projects[key].color;
          if (members.includes(email)) {
            allProjects.push({ name, key, color, members });
          }
        }
        self.setState({
          projects: allProjects,
        });
      }
    });
  }

  deleteProject(key) {
    return firebase
      .database()
      .ref('projects')
      .child(key)
      .remove();
  }

  render() {
    const projects = this.state.projects;
    const user = this.state.user;
    const nav = this.props.navigation;
    return (
      <ScrollView>
        <Card containerStyle={{padding: 20, shadowOpacity: 0, shadowColor: 'white', borderWidth: 0}}>
          <Text h4 style={{textAlign: 'center', fontFamily: 'Abril'}}>Profile</Text>
					<Divider style={{backgroundColor: '#c0c0c0', marginTop: 15}} />
          {user ? (
						<Card containerStyle={{shadowOpacity: 0, shadowColor: 'white', borderWidth: 0}}>
              <Text style={{fontFamily: 'Oxygen'}}>Name: {user.displayName}</Text>
              <Text style={{fontFamily: 'Oxygen'}}>E-mail: {user.email}</Text>
						</Card>
          ) : null}
          <Text h4 style={{textAlign: 'center', fontFamily: 'Abril'}}>{`\nProjects`}</Text>
          {projects ? (
            <List>
              {projects.map(project => (
                <ListItem
                  key={project.key}
                  title={project.name}
                  rightIcon={{ name: 'delete', style: { marginRight: 10 } }}
                  leftIcon={{ name: 'lens', color: '#' + project.color }}
                  onPressRightIcon={() => this.deleteProject(project.key)}
                  style={{
                    marginLeft: 0,
										paddingLeft: 10,
                  }}
                  container={{
                    flex: 1,
									}}
                >
                  <Text style={{fontFamily: 'Oxygen'}}>{project.name}</Text>
                </ListItem>
							))}
							          <Button
            title="CREATE PROJECT"
            buttonStyle={{
              width: '100%',
              height: 45,
							marginTop: 10,
							backgroundColor: '#242424',
							alignContent: 'center'
            }}
            onPress={() => nav.navigate('Create')}
          />
            </List>
          ) : null}
        </Card>
      </ScrollView>
    );
  }
}
