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
      groupOpen: true,
      personalOpen: true
    };
  }

  static navigationOptions = {
    header: null
  };

  render() {
    const personalProjects = this.state.sections.personal;
    const groupProjects = this.state.sections.groups;
    return (
      <View>
        <ScrollView>
          {/* <View style={{ backgroundColor: "white", height: 100 }}> */}
          <Button
            title="Profile"
            titleStyle={{ fontWeight: "700", fontSize: "20" }}
            buttonStyle={{
              backgroundColor: "rgba(127, 63, 191, 0.8)",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 3
            }}
            onPress={() => console.log(this.state.sections.personal)}
          />
          <Button
            title="MASTER CALENDAR"
            titleStyle={{ fontWeight: "700", fontSize: "20" }}
            buttonStyle={{
              backgroundColor: "rgba(63, 191, 191, 0.8)",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 3,
              padding: 10
            }}
            onPress={() => console.log(this.state.sections.personal)}
          />
          <Button
            title="Personal Projects"
            titleStyle={{ fontWeight: "700", fontSize: "20" }}
            buttonStyle={{
              backgroundColor: "rgba(191, 63, 191, 0.8)",
              borderColor: "transparent",
              borderWidth: 2,
              borderRadius: 3
            }}
            onPress={(this.state.personalOpen = !this.state.personalOpen)}
          />
          return this.state.pesonalOpen?(
          <View>
            <SectionList
              sections={personalProjects}
              renderItem={({ item, index, section }) => (
                <Button
                  title={section.title}
                  buttonStyle={{
                    backgroundColor: "rgba(63, 63, 191,0.8)",
                    borderColor: "transparent"
                  }}
                  onPress={() => console.log(section)}
                />
              )}
              keyExtractor={(item, index) => item + index}
            />
            <Button
              title="GROUP PROJECTS"
              titleStyle={{ fontWeight: "700", fontSize: "20" }}
              buttonStyle={{
                backgroundColor: "rgba(63, 191, 63, 0.8)",
                borderColor: "transparent",
                borderWidth: 2,
                borderRadius: 3
              }}
              onPress={(this.state.groupOpen = !this.state.groupOpen)}
            />
            ):()
            {/* //this.state.groupOpen?( */} */}
          </View>
          <View>
            <SectionList
              sections={groupProjects}
              renderItem={({ item, index, section }) => (
                <Button
                  title={section.title}
                  buttonStyle={{
                    backgroundColor: "rgba(63, 191, 191, 0.9)",
                    borderColor: "transparent"
                  }}
                  onPress={() => console.log(section)}
                >
                  <Text key={index}>{item}</Text>
                </Button>
              )}
              keyExtractor={(item, index) => item + index}
            />
          </View>
          {/* ):() */}
        </ScrollView>
      </View>
    );
  }
}

export default MenuItems;
