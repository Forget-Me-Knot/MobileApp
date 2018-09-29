import React from "react";
import { createSwitchNavigator } from "react-navigation";
// import Login from "../screens/Login";
import MainTabNavigator from "./MainTabNavigator";
import BottomMenu from "./MainTabNavigator";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  // Auth: AuthScreen,
  Main: MainTabNavigator
});
