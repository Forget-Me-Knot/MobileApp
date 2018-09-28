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
    this.showMenu = this.showMenu.bind(this);
  }
  showMenu() {
    return (
      <View>
        <SectionList
          renderItem={({ item, index, section }) => (
            <Text key={index}>{item}</Text>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: "bold" }}>{title}</Text>
          )}
          sections={[
            { title: "Title1", data: ["item1", "item2"] },
            { title: "Title2", data: ["item3", "item4"] },
            { title: "Title3", data: ["item5", "item6"] }
          ]}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
  render() {
    return (
      <View>
        <Toolbar
          leftElement="menu"
          // style={{ color: "grey" }}
          height="80px"
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
          onPress={() => this.showMenu()}
        >
          <Button title="menu" onPress={() => this.showMenu()} />
        </Toolbar>
        {/* <SectionList
          renderItem={({ item, index, section }) => (
            <Text key={index}>{item}</Text>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: "bold" }}>{title}</Text>
          )}
          sections={[
            { title: "Title1", data: ["item1", "item2"] },
            { title: "Title2", data: ["item3", "item4"] },
            { title: "Title3", data: ["item5", "item6"] }
          ]}
          keyExtractor={(item, index) => item + index}
        /> */}
      </View>
    );
  }
}
