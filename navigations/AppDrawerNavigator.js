import React, { Component } from 'react';
import { Image } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import {
  Container,
  Header,
  Content,
  Body,
  Button,
  List,
  ListItem,
  Text,
} from 'native-base';
import AppStackNavigator from './AppStackNavigator';
import Login from '../screens/Login';
import Notes from '../screens/Notes';
import Todo from '../screens/ToDo';
import Menu from '../screens/MenuItems';
import Calendar from '../screens/Calendar';
import firebase from '../firebase';

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

const LogoutButton = () => {
  return firebase.auth().currentUser ? (
    <Button full light onPress={() => logOut()}>
      <Text>LOGOUT</Text>
    </Button>
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
              }
              if (members[0] === user.email) {
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
        <Content>
          <List>
            <ListItem
              style={{
                marginLeft: 0,
                paddingLeft: 10,
                backgroundColor: 'pink',
              }}
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <Text>Login</Text>
            </ListItem>
            <ListItem
              style={{
                marginLeft: 0,
                paddingLeft: 10,
                backgroundColor: 'plum',
              }}
              onPress={() => this.props.navigation.navigate('Projects')}
            >
              <Text>Projects</Text>
            </ListItem>
            <ListItem
              style={{
                marginLeft: 0,
                paddingLeft: 10,
                backgroundColor: 'aqua',
              }}
              onPress={() => this.props.navigation.navigate('Todo')}
            >
              <Text>Todo</Text>
            </ListItem>
            {this.state.personal
              ? this.state.personal.map(project => {
                  const color = '#' + project.color;
                  return (
                    <ListItem
                      key={project.key}
                      style={{
                        marginLeft: 0,
                        paddingLeft: 10,
                        backgroundColor: color,
                      }}
                      onPress={() =>
                        props.navigation.navigate('PersonalProjList')
                      }
                    >
                      {' '}
                      <Text>{project.name}</Text>
                    </ListItem>
                  );
                })
              : null}
            {this.state.groups
              ? this.state.groups.map(project => {
                  const color = '#' + project.color;
                  return (
                    <ListItem
                      key={project.key}
                      style={{
                        marginLeft: 0,
                        paddingLeft: 10,
                        backgroundColor: color,
                      }}
                      onPress={() => props.navigation.navigate('GroupProjList')}
                    >
                      {' '}
                      <Text>{project.name}</Text>
                    </ListItem>
                  );
                })
              : null}
          </List>
          <LogoutButton />
        </Content>
      </Container>
    );
  }
}

// const CustomDrawer = props => (
//   <Container>
//     <Header style={{ height: 80 }}>
//       <Body>
//         <Image
//           style={{ height: 30, width: 30 }}
//           source={require('../assets/reminder.png')}
//         />
//       </Body>
//     </Header>
//     <Content>
//       <List>
//         <ListItem
//           style={{ marginLeft: 0, paddingLeft: 10, backgroundColor: 'pink' }}
//           onPress={() => props.navigation.navigate('Login')}
//         >
//           <Text>Login</Text>
//         </ListItem>
//         <ListItem
//           style={{ marginLeft: 0, paddingLeft: 10, backgroundColor: 'plum' }}
//           onPress={() => props.navigation.navigate('Projects')}
//         >
//           <Text>Projects</Text>
//         </ListItem>
//         <ListItem
//           style={{ marginLeft: 0, paddingLeft: 10, backgroundColor: 'aqua' }}
//           onPress={() => props.navigation.navigate('Todo')}
//         >
//           <Text>Todo</Text>
//         </ListItem>
//         <ListItem
//           style={{ marginLeft: 0, paddingLeft: 10, backgroundColor: 'yellow' }}
//           onPress={() => props.navigation.navigate('Notes')}
//         >
//           <Text>Notes</Text>
//         </ListItem>
//         {getPersonalProjects().map(project => (
//           <ListItem
//             onPress={() => props.navigation.navigate('PersonalProjList')}
//           >
//             {' '}
//             <Text>{project.name}</Text>
//           </ListItem>
//         ))}
//         {getGroupProjects().map(project => (
//           <ListItem onPress={() => props.navigation.navigate('GroupProjList')}>
//             {' '}
//             <Text>{project.name}</Text>
//           </ListItem>
//         ))}
//       </List>
//       <LogoutButton />
//     </Content>
//   </Container>
// )

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: AppStackNavigator,
    Login: Login,
    Notes: Notes,
    Todo: Todo,
    Projects: Menu,
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'left',
    contentComponent: CustomDrawer,
  }
);

export default AppDrawerNavigator;
