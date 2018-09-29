import { Toolbar, ListItem, Drawer } from "react-native-material-ui";
import React, { PropTypes } from "react";
import { Platform } from "react-native";
import { Text, View, SectionList, Button } from "react-native";
import { WebBrowser } from "expo";
import menuItems from "./MenuItems";
import Login from "./login";

export default class Navbar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View>
        <Toolbar
          rightElement="account-circle"
          icon="account-circle"
          onRightElementPress={() => <Login />}
        />
        {/* <Button
            title="profile"
            onPress={() => {
              return <Login />;
            }}
          /> */}
        {/* </Toolbar> */}
      </View>
    );
  }
}
