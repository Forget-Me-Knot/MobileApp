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

// class PersonalProjList extends Component {
//   constructor() {
//     super();
//     this.state = {

//         static navigationOptions = {
//             header: null
//           };

// render() {
const PersonalProjList = props => {
  return (
    <View>
      <SectionList
        sections={props.personalProjects}
        renderItem={({ item, index, section }) => (
          <Button
            title={section.title}
            rightIcon={{ name: "chevron-right" }}
            buttonStyle={{
              backgroundColor: "rgba(63, 63, 191,0.8)",
              borderColor: "transparent",
              marginBottom: 5
            }}
            onPress={() => console.log(section)}
          />
        )}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  );
};

export default PersonalProjList;
