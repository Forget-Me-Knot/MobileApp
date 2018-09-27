import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";
import QuickNotes from "../screens/QuickNotes";
import { Navbar } from "../screens/NavbarNavigator";
import DemoInfoScreen from "../screens/DemoInfo";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Calender",
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

// const LinksStack = createStackNavigator({
//   Links: LinksScreen
// });

// LinksStack.navigationOptions = {
//   tabBarLabel: "Quick Notes",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === "ios"
//           ? `ios-create${focused ? "" : "-outline"}`
//           : "md-create"
//       }
//     />
//   )
// };
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

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen
// });

// SettingsStack.navigationOptions = {
//   tabBarLabel: "Home",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === "ios"
//           ? `ios-home${focused ? "" : "-outline"}`
//           : "md-home"
//       }
//     />
//   )
// };
const DemoStack = createStackNavigator({
  Demo: DemoInfoScreen
});

DemoStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-home${focused ? "" : "-outline"}`
          : "md-home"
      }
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  //LinksStack,
  QuickNotesStack,
  // SettingsStack,
  DemoStack
});
