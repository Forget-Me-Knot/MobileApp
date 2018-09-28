import { Toolbar, ListItem, Drawer } from "react-native-material-ui";
import React, { PropTypes } from "react";
import { Platform } from "react-native";
import { Text, View, SectionList, Button } from "react-native";
import { WebBrowser } from "expo";
import menuItems from "./MenuItems";
// import { MonoText } from "../components/StyledText";

export default class Navbar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View>
        <Toolbar
          leftElement="menu"
          // style={{ color: "grey" }}
          //height="80px"
          icon="menu"
          // backgroundColor="grey"
          // rightElement={{
          //   menu: {
          //     icon: "more-vert",
          //     labels: ["item 1", "item 2"]
          //   }
          // }}
          // onRightElementPress={label => {
          //   console.log(label);
          // }}
        >
          <Button title="menu" onPress={() => this.showMenu()} />
        </Toolbar>
      </View>
    );
  }
}
