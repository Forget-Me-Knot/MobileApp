import React, { PropTypes } from "react";
import { Toolbar, ListItem, Drawer } from "react-native-material-ui";
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
import Login from "./LoginAll";
import { createStackNavigator } from "react-navigation";
import Router from "../navigation/Router";
// import { Actions } from "react-native-router-flux";
// import { withNavigation } from "react-navigation";

import RCTCameraRoll from "react-native";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const nav = this.props.navigation;
    console.log(nav);
    return (
      // <View>
      <Toolbar
        leftElement="photo-camera"
        rightElement="account-circle"
        centerElement="Forget Me Knot"
        onRightElementPress={() => this.props.navigate("Login")}
        //onRightElementPress={() => <Login />}
      />
      /* </View> */
    );
  }
}
