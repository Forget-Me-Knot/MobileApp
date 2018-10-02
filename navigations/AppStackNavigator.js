import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "react-navigation";
import AppTabNavigator from "./AppTabNavigator";
import Login from "../screens/Login";

const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: AppTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: "Forget Me Knot",
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="menu" />
          </View>
        </TouchableOpacity>
      )
    })
  },
  Login: {
    screen: Login
  }
});

export default AppStackNavigator;
