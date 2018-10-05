import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import AppTabNavigator from './AppTabNavigator';
import Login from '../screens/Login';
import Todo from '../screens/ToDo';
import Menu from '../screens/MenuItems';
import CreateProject from '../screens/CreateProject';

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
  Projects: {
    screen: Menu,
  },
  Create: {
    screen: CreateProject,
  },
});

export default AppStackNavigator;
