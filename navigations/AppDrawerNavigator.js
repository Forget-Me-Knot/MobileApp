import React, { Component } from 'react';
import { Image } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import {
  Container,
  Header,
  Content,
  Body,
  Button,
  Text,
  View,
  List,
  ListItem,
} from 'native-base';
import { Avatar } from 'react-native-elements';
import AppStackNavigator from './AppStackNavigator';
import Login from '../screens/Login';
import Todo from '../screens/ToDo';
import Menu from '../screens/MenuItems';
import firebase from '../firebase';
import CreateProject from '../screens/CreateProject';
import ProjectHome from '../screens/ProjectHome';

const logOut = function() {
  firebase
    .auth()
    .signOut()
    .then(
      function() {
        console.log('Sign out complete.');
      },
      function(error) {
        console.error(error);
      }
    );
};

const LogoutButton = props => {
  return firebase.auth().currentUser ? (
    <View>
      <Button full light onPress={() => props.navigation.navigate('Create')}>
        <Text>Create Project</Text>
      </Button>
      <Button
        // style={{ backgroundColor: '#F2F2F2' }}
        full
        light
        onPress={() => logOut()}
      >
        <Text>LOGOUT</Text>
      </Button>
    </View>
  ) : null;
};

class CustomDrawer extends Component {
  constructor() {
    super();
    this.state = {
      groups: [],
      personal: [],
    };
  }

  componentDidMount() {
    const self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        let groupProjects = [];
        let userProjects = [];
        var ref = firebase.database().ref('projects');
        ref.on('value', function(snapshot) {
          let projects = snapshot.val();
          for (let key in projects) {
            if (projects[key].members) {
              const members = projects[key].members;
              const name = projects[key].name;
              const color = projects[key].color;
              if (members.includes(user.email) && members.length > 1) {
                groupProjects.push({ name, key, color });
              } else if (members[0] === user.email) {
                userProjects.push({ name, key, color });
              }
              self.setState({
                groups: groupProjects,
                personal: userProjects,
              });
            }
          }
        });
      }
    });
  }

  render() {
    const nav = this.props.navigation;
    return (
      <Container>
        <Header style={{ height: 80 }}>
          <Body>
            <Image
              style={{ height: 30, width: 30 }}
              source={require('../assets/reminder.png')}
            />
          </Body>
        </Header>
        <Content
          contentContainerStyle={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <List>
            <ListItem
              style={{
                marginLeft: 0,
                paddingLeft: 10,
              }}
              onPress={() => nav.navigate('Login')}
            >
              <Text>LOG IN</Text>
            </ListItem>
            <ListItem
              style={{
                marginLeft: 0,
                paddingLeft: 10,
              }}
              onPress={() => nav.navigate('Todo')}
            >
              <Text>TO DO</Text>
            </ListItem>
            <ListItem
              style={{
                marginLeft: 0,
                paddingLeft: 10,
                backgroundColor: '#F2F2F2',
              }}
            >
              <Text>PERSONAL PROJECTS:</Text>
            </ListItem>
            {this.state.personal
              ? this.state.personal.map(project => {
                  return (
                    <ListItem
                      key={project.key}
                      title={project.name}
                      style={{
                        marginLeft: 0,
                        paddingLeft: 10,
                      }}
                      container={{
                        flex: 1,
                      }}
                      onPress={() =>
                        nav.navigate('ProjectHome', {
                          project: project,
                        })
                      }
                    >
                      {' '}
                      <Avatar
                        rounded
                        icon={{ name: 'user', type: 'font-awesome' }}
                        size="xsmall"
                        containerStyle={{
                          marginRight: 20,
                        }}
                        overlayContainerStyle={{
                          backgroundColor: `#${project.color}`,
                        }}
                      />
                      <Text>{project.name}</Text>
                    </ListItem>
                  );
                })
              : null}

            <ListItem
              style={{
                marginLeft: 0,
                paddingLeft: 10,
                backgroundColor: '#F2F2F2',
              }}
            >
              <Text>GROUP PROJECTS:</Text>
            </ListItem>
            {this.state.groups
              ? this.state.groups.map(project => {
                  return (
                    <ListItem
                      key={project.key}
                      style={{
                        marginLeft: 0,
                        paddingLeft: 10,
                      }}
                      onPress={() => nav.navigate('GroupProjList')}
                    >
                      {' '}
                      <Avatar
                        rounded
                        icon={{ name: 'users', type: 'font-awesome' }}
                        size={50}
                        containerStyle={{
                          marginRight: 20,
                        }}
                        overlayContainerStyle={{
                          backgroundColor: `#${project.color}`,
                        }}
                      />
                      <Text>{project.name}</Text>
                    </ListItem>
                  );
                })
              : null}
          </List>
          <LogoutButton navigation={nav} />
        </Content>
      </Container>
    );
  }
}

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: AppStackNavigator,
    Login: Login,
    Todo: Todo,
    // Projects: Menu,
    Create: CreateProject,
    ProjectHome: ProjectHome,
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'left',
    contentComponent: CustomDrawer,
  }
);

export default AppDrawerNavigator;
