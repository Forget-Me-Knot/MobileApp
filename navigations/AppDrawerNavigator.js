import React from 'react';
import { Image } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import { Container, Header, Content, Body, Button, List, ListItem, Text } from 'native-base';
import AppStackNavigator from './AppStackNavigator';
import Login from '../screens/Login';
import Notes from '../screens/Notes';
import Todo from '../screens/ToDo';
import Menu from '../screens/MenuItems';
import firebase from '../firebase'

const logOut = function(){
	firebase.auth().signOut().then(function(){
		console.log('Sign out complete.')
	}, function(error){
		console.error(error)
	})
}

const LogoutButton = () => {
	return (
		firebase.auth().currentUser ?
		<Button full light onPress={() => logOut()}>
			<Text>LOGOUT</Text>
		</Button> :
		null
	)
}

const CustomDrawer = props => (
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
				<ListItem style={{marginLeft: 0, paddingLeft: 10, backgroundColor: 'pink'}} onPress={() => props.navigation.navigate('Login')}>
					<Text>Login</Text>
				</ListItem>
				<ListItem style={{marginLeft: 0, paddingLeft: 10, backgroundColor: 'plum'}} onPress={() => props.navigation.navigate('Projects')}>
					<Text>Projects</Text>
				</ListItem>
				<ListItem style={{marginLeft: 0, paddingLeft: 10, backgroundColor: 'aqua'}} onPress={() => props.navigation.navigate('Todo')}>
					<Text>Todo</Text>
				</ListItem>
				<ListItem style={{marginLeft: 0, paddingLeft: 10, backgroundColor: 'yellow'}} onPress={() => props.navigation.navigate('Notes')}>
					<Text>Notes</Text>
				</ListItem>
			</List>
			<LogoutButton />
    </Content>
  </Container>
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: AppStackNavigator,
    Login: Login,
    Notes: Notes,
    Todo: Todo,
    Projects: Menu
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'left',
    contentComponent: CustomDrawer
  }
);

export default AppDrawerNavigator;
