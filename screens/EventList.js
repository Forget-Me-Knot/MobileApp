import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Button } from "react-native-elements";
import { WebBrowser } from "expo";
import { Divider, Typography } from "react-native-material-ui";
import { MonoText } from "../components/StyledText";
import { List, ListItem } from "react-native-elements";

// class GroupPojList extends Component {
//   constructor() {
//     super();
//     this.state = {

//         static navigationOptions = {
//             header: null
//           };

// const listC = [
//   {
//     task: "Do All The THINGS!",
//     memebers: ["syun", "kristin"],
//     projects: "Capstone",
//     date: {
//       day: 1,
//       month: 10,
//       year: 2018,
//       timestamp: 1538512200000,
//       dateString: "2018-10-01"
//     }
//   },
//   {
//     task: "Capstone: Make Calendar Work!",
//     memebers: ["syun", "kristin"],
//     projects: "Capstone",
//     date: {
//       day: 1,
//       month: 10,
//       year: 2018,
//       timestamp: 1538512200000,
//       dateString: "2018-10-01"
//     }
//   },
//   {
//     task: "Code Review!",
//     memebers: ["syun", "kristin"],
//     projects: "Capstone",
//     date: {
//       day: 2,
//       month: 10,
//       year: 2018,
//       timestamp: 1538512200000,
//       dateString: "2018-10-02"
//     }
//   },
//   {
//     task: "Capstone: Switch roles",
//     memebers: ["syun", "kristin"],
//     projects: "Capstone",
//     date: {
//       day: 3,
//       month: 10,
//       year: 2018,
//       timestamp: 1538512200000,
//       dateString: "2018-10-03"
//     }
//   },
//   {
//     task: " Make Everything Work",
//     memebers: ["syun", "kristin"],
//     projects: "Capstone",
//     date: {
//       day: 5,
//       month: 10,
//       year: 2018,
//       timestamp: 1538512200000,
//       dateString: "2018-10-05"
//     }
//   }
// ];

// render() {
const EventList = props => {
  return (
    <ScrollView>
      <View>
        <List containerStyle={{ marginBottom: 20 }}>
          {props.events.map(l => (
            <ListItem
              roundAvatar
              avatar={{ uri: l.avatar_url }}
              key={l.name}
              title={l.task}
            />
          ))}
        </List>
      </View>
    </ScrollView>
  );
};
export default EventList;
