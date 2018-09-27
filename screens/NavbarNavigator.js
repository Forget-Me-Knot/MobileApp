import { Toolbar, ListItem, Drawer } from "react-native-material-ui";
import React, { PropTypes } from "react";
import { Platform } from "react-native";
import { Text, View } from "react-native";
import { WebBrowser } from "expo";

// import { MonoText } from "../components/StyledText";

export default class Navbar extends React.Component {
  render() {
    return (
      <View>
        <Toolbar
          leftElement="menu"
          style={{ height: 80 }}
          height="80px"
          rightElement={{
            menu: {
              icon: "more-vert",
              labels: ["item 1", "item 2"]
            }
          }}
          onRightElementPress={label => {
            console.log(label);
          }}
        >
          {" "}
          <ListItem
            divider
            centerElement={{
              primaryText: "Primary text"
            }}
            // onPress={() => {}}
          >
            <Text> testing</Text>
          </ListItem>
        </Toolbar>
      </View>
    );
  }
}
