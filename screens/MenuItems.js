import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  SectionList,
  View
} from "react-native";
import { Button } from "react-native-elements";
import { WebBrowser } from "expo";
import { Divider, Typography } from "react-native-material-ui";
import { MonoText } from "../components/StyledText";
import PersonalProjList from "./PersonalProjList";
import GroupProjList from "./GroupProjList";

class MenuItems extends Component {
  constructor() {
    super();
    this.state = {
      sections: {
        groups: [
          {
            title: "IF ya can't love yo self",
            data: ["CAN I GET AN AMEN?"]
          },
          {
            title: "How the hell ya gonna ",
            data: ["CAN I GET AN AMEN?"]
            // data: ["item3", "item4"]
          },
          {
            title: "Love somebody else?",
            data: ["CAN I GET AN AMEN?"]
          }
        ],
        personal: [
          {
            title: "Capstone",
            data: ["item7"]
          },
          {
            title: "MAKE IT WORK!",
            data: ["item7"]
          }
        ]
      },
      personalClick: false,
      groupClick: false
    };
    this.personalList = this.personalList.bind(this);
    this.groupList = this.groupList.bind(this);
  }

  static navigationOptions = {
    header: null
  };
  personalList() {
    if (!this.state.personalClick) {
      this.setState({ personalClick: true });
    } else {
      this.setState({ personalClick: false });
    }
  }
  groupList() {
    if (!this.state.groupClick) {
      this.setState({ groupClick: true });
    } else {
      this.setState({ groupClick: false });
    }
  }

  render() {
    const personalProjects = this.state.sections.personal;
    const groupProjects = this.state.sections.groups;
    return (
      <View style={{ marginTop: 10 }}>
        <ScrollView>
          <Button
            title="Profile"
            titleStyle={{ fontWeight: "700", fontSize: "20" }}
            buttonStyle={{
              backgroundColor: "rgba(127, 63, 191, 0.8)",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 3,
              marginBottom: 5
            }}
            onPress={() => this.props.navigation.navigate("Login")}
          />
          <Button
            title="To Do List"
            titleStyle={{ fontWeight: "700", fontSize: "20" }}
            rightIcon={{ name: "arrow-drop-down-circle" }}
            buttonStyle={{
              backgroundColor: "rgba(63, 191, 191, 0.8)",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 3,
              padding: 10,
              marginBottom: 5
            }}
            onPress={() => this.props.navigation.navigate("ToDo")}
          />
          <Button
            title="PERSONAL PROJECTS"
            titleStyle={{ fontWeight: "700", fontSize: "20" }}
            buttonStyle={{
              backgroundColor: "rgba(191, 63, 191, 0.8)",
              borderColor: "transparent",
              borderWidth: 2,
              borderRadius: 3,
              marginBottom: 5
            }}
            rightIcon={{ name: "keyboard-arrow-down" }}
            onPress={() => {
              this.personalList();
            }}
          />
          {this.state.personalClick ? (
            <PersonalProjList personalProjects={personalProjects} />
          ) : null}{" "}
          */}
          <Button
            title="GROUP PROJECTS"
            titleStyle={{ fontWeight: "700", fontSize: "20" }}
            rightIcon={{ name: "keyboard-arrow-down" }}
            buttonStyle={{
              backgroundColor: "rgba(63, 191, 63, 0.8)",
              borderColor: "transparent",
              borderWidth: 2,
              borderRadius: 3,
              marginBottom: 5
            }}
            onPress={() => {
              this.groupList();
            }}
          />
          {this.state.groupClick ? (
            <GroupProjList groupProjects={groupProjects} />
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

export default MenuItems;
