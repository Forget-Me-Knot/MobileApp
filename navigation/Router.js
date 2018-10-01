// import React, { Component } from "react";
// import { Router, Scene, Stack } from "react-native-router-flux";
// import Login from "../screens/Login";
// import MessageCard from "../screens/Card";
import React, { PropTypes } from "react";
import { Platform } from "react-native";
import {
  Text,
  View,
  SectionList,
  Button,
  TouchableHighlight,
  Link
} from "react-native";
import { WebBrowser } from "expo";
import Navbar from "../screens/Navbar";
import Login from "../screens/LoginAll";
import { createStackNavigator } from "react-navigation";

export default createStackNavigator({
  Login: { screen: Login }
});

// xs

// const Root = () => (
//   <Router>
//     <Stack key="root">
//       <Scene key="Login" component={Login} title="Login" />

//       <Scene key="home" component={MessageCard} />
//     </Stack>
//   </Router>
// );

// export default Root;

// import React from "react";
// import Login from "../screens/Login";

// import { Platform } from "react-native";
// import { createStackNavigator } from "react-navigation";
// import HomeScreen from "../screens/HomeScreen";

// const AppNav = createStackNavigator({
//   Login: { screen: Login },
//   Home: { screen: HomeScreen }
// });

// export default AppNav;
