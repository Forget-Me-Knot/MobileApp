import React, { Component } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, FlatList, SectionList, View } from "react-native";
import { Button } from "react-native-elements";
import { WebBrowser } from "expo";
import { Divider, Typography } from "react-native-material-ui";
import { MonoText } from "../components/StyledText";

const GroupProjList = props => {
  return (
    <View>
      <SectionList
        sections={props.groupProjects}
        renderItem={({ item, index, section }) => (
          <Button
            title={section.title}
            rightIcon={{ name: "chevron-right" }}
            buttonStyle={{
              backgroundColor: "rgba(63, 191, 191, 0.9)",
              borderColor: "transparent",
              marginBottom: 5
            }}
            onPress={() => console.log(section)}
          >
            <Text key={index}>{item}</Text>
          </Button>
        )}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  );
};
export default GroupProjList;
