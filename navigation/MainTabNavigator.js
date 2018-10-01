import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import QuickNotes from "../screens/QuickNotes";
import MessageCard from "../screens/Entries";
import MenuItems from "../screens/MenuItems";
import Login from "../screens/LoginAll";
import UserLogin from "../screens/UserLogin";
import SignUp from "../screens/SignUp";
import Navbar from "../screens/Navbar";

// const stackNavigator = StackNavigator({
//   Info: { screen: InfoView },
//   Settings: {screen: SettingsView },
//   Bookmark: {screen: BookmarkView },
//   Calendar: {screen: CalendarView},
//   Client: {screen: ClientView},
// }, {
//   headerMode: 'none'
// });
// const easyRNRoute = DrawerNavigator({
//   Home: {
//     screen: App,
//   },
//   Stack: {
//     screen: stackNavigator
//   }
//   }, {
//     contentComponent: DrawerMenu,
//     contentOptions: {
//     activeTintColor: ‘#e91e63’,
//     style: {
//       flex: 1,
//       paddingTop: 15,
//     }
//   }
// });

const CalendarStack = createStackNavigator({
  Home: HomeScreen
});
CalendarStack.navigationOptions = {
  tabBarLabel: "Calendar",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-calendar${focused ? "" : "-outline"}`
          : "md-calendar"
      }
    />
  )
};

const MenuStack = createStackNavigator({
  MenuItems: MenuItems,
  Login: Login
});

MenuStack.navigationOptions = {
  tabBarLabel: "Menu",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-menu${focused ? "" : "-outline"}`
          : "md-menu"
      }
    />
  )
};
const QuickNotesStack = createStackNavigator({
  QuickNotes: QuickNotes
});

QuickNotesStack.navigationOptions = {
  tabBarLabel: "Quick Notes",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-create${focused ? "" : "-outline"}`
          : "md-create"
      }
    />
  )
};

const MessagesStack = createStackNavigator({
  Messages: MessageCard
});

MessagesStack.navigationOptions = {
  tabBarLabel: "Entries",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-paper${focused ? "" : "-outline"}`
          : "md-paper"
      }
    />
  )
};

const LoginStack = createStackNavigator({
  Login: Login
});

LoginStack.navigationOptions = {
  tabBarLabel: "login",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-log-in${focused ? "" : "-outline"}`
          : "md-log-in"
      }
    />
  )
};

export default createBottomTabNavigator({
  CalendarStack,
  MessagesStack,
  QuickNotesStack,
  LoginStack,
  MenuStack
});
