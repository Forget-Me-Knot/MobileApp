import { Toolbar, ListItem, Drawer } from "react-native-material-ui";
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
import Login from "./LoginAll";
// import { createStackNavigator } from "react-navigation";
// import { Actions } from "react-native-router-flux";
// import { withNavigation } from "react-navigation";

import RCTCameraRoll from "react-native";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View>
        <Toolbar
          // backgroundColor={"pink"}
          // style={{
          //   backgroundColor: "rgba(63, 191, 191, 0.8)",
          //   borderColor: "transparent",
          //   borderWidth: 2,
          //   borderRadius: 3,
          //   marginBottom: 5,
          //   fontSize: 20,
          //   textAlign: "center"
          // }}
          leftElement="photo-camera"
          rightElement="account-circle"
          centerElement="Forget Me Knot"
          // centerElement style={{c}}
          // onRightElementPress={() => this.props.navigatation("Login")}
          onRightElementPress={() => <Login />}
          // rightElement={{
          //   Login: {
          //     icon: "account-circle"
          //   }
          // }}
        />
      </View>
    );
  }
}
