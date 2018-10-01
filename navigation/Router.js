// import React, { PropTypes, Component } from "react";
// import { Platform } from "react-native";
// import {
//   Text,
//   View,
//   SectionList,
//   Button,
//   TouchableHighlight,
//   Link
// } from "react-native";
// import { WebBrowser } from "expo";
// import Navbar from "../screens/Navbar";
// import Login from "../screens/LoginAll";
// import {
//   createStackNavigator,
//   createMaterialTopTabNavigator
// } from "react-navigation";
// import MainTabNavigator from "./MainTabNavigator";
// import { StackActions, NavigationActions } from "react-navigation";

// const MainStack = createStackNavigator({
//   Login: { screen: Login }
// });
// // createMaterialTopTabNavigator;

// MainStack.navigationOptions = {
//   tabBarLabel: "Login",
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
// const MainTab = createMaterialTopTabNavigator(
//   {
//     Home: MainStack,
//     Bottom: MainTabNavigator
//     // Navbar: { screen: Navbar }
//   },
//   {
//     tabBarPosition: "top"
//   }
// );

// export default NavbarStack;
