import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import AppTabNavigator from './AppTabNavigator';
import Login from '../screens/Login';
import Todo from '../screens/ToDo';
import CreateProject from '../screens/CreateProject';
import CreateEvent from '../screens/CreateEvent';
import CreateTodo from '../screens/CreateTodo';
import ProjectHome from '../screens/ProjectHome';
import Profile from '../screens/Profile';
import Photos from '../screens/Photos';
import CreatePhoto from '../screens/CreatePhoto';

const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: AppTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Forget Me Knot',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="menu" />
          </View>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('CreateEvent')}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="add" />
          </View>
        </TouchableOpacity>
      ),
    }),
  },
  Login: {
    screen: Login,
    headerRight: null,
  },
  Todo: {
    screen: Todo,
    headerRight: null,
  },
  Create: {
    screen: CreateProject,
    headerRight: null,
  },
  CreateEvent: {
    screen: CreateEvent,
    headerRight: null,
  },
  CreateTodo: {
    screen: CreateTodo,
    headerRight: null,
  },
  ProjectHome: {
    screen: ProjectHome,
    headerRight: null,
  },
  Profile: {
    screen: Profile,
    headerRight: null,
  },
  Photos: {
    screen: Photos,
    headerRight: null,
  },
  CreatePhoto: {
    screen: CreatePhoto,
    headerRight: null,
  },
});

export default AppStackNavigator;
