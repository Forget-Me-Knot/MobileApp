import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import Home from "../screens/Home";
import CalendarView from "../screens/Calendar";
import Notes from "../screens/Notes";
import Write from "../screens/Write";

const AppTabNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
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
    }
  },
  Calendar: {
    screen: CalendarView,
    navigationOptions: {
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
    }
  },
  Notes: {
    screen: Notes,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={
            Platform.OS === "ios"
              ? `ios-list-box${focused ? "" : "-outline"}`
              : "md-list-box"
          }
        />
      )
    }
  },
  Write: {
    screen: Write,
    navigationOptions: {
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
    }
  }
});

export default AppTabNavigator;
