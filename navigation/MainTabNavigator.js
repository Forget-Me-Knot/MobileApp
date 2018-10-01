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
import DemoInfoScreen from "../screens/DemoInfo";
import MessageCard from "../screens/Entries";
import MenuItems from "../screens/MenuItems";

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

const MenuStack = createStackNavigator({
  MenuItems: MenuItems
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
// const MenuStack = createStackNavigator({
//   Navbar: Navbar
// });

// MenuStack.navigationOptions = {
//   tabBarLabel: "menu",
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

// const HomeStack = createStackNavigator({
//   Home: DemoInfoScreen
// });

// HomeStack.navigationOptions = {
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

export default createBottomTabNavigator({
  HomeStack,
  //LinksStack,
  MenuStack,
  MessagesStack,
  QuickNotesStack,
  // SettingsStack,
  DemoStack
});
