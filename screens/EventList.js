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
import { Divider, Typography, Avatar } from "react-native-material-ui";
import { MonoText } from "../components/StyledText";
import { List, ListItem } from "react-native-elements";

// render() {
const EventList = props => {
  console.log("props in eventList", props.events);

  return (
    <ScrollView>
      <View>
        <List containerStyle={{ marginBottom: 20 }}>
          {props.events.map(l => (
            <ListItem
              leftIcon={{ name: "lens", color: `${l.color}` }}
              key={l.task}
              title={l.task}
              children={"x"}
              hideChevron
            />
          ))}
        </List>
      </View>
    </ScrollView>
  );
};
export default EventList;
