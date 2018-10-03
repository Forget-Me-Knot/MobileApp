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

// render() {
const EventList = props => {
  console.log("props in eventList", props.events);

  return (
    <ScrollView>
      <View>
        <List containerStyle={{ marginBottom: 20 }}>
          {props.events.map(l => (
            <ListItem
              roundAvatar
              avatar={{ uri: l.avatar_url }}
              key={l.task}
              title={l.task}
            />
          ))}
        </List>
      </View>
    </ScrollView>
  );
};
export default EventList;
