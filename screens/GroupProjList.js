import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  SectionList,
  View,
} from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import { WebBrowser } from 'expo';
import { Divider, Typography } from 'react-native-material-ui';
import { MonoText } from '../components/StyledText';

const GroupProjList = props => {
  const groupProjects = props.groupProjects;
  return (
    <View>
      <List>
        {groupProjects.map(project => (
          <ListItem key={project.key} title={project.name} />
        ))}
      </List>
      {/* <SectionList
        sections={props.groupProjects}
        renderItem={({ item, index, section }) => (
          <Button
            title={section.name}
            rightIcon={{ name: 'chevron-right' }}
            buttonStyle={{
              backgroundColor: 'rgba(63, 191, 191, 0.9)',
              borderColor: 'transparent',
              marginBottom: 5,
            }}
            onPress={() => console.log(section)}
          >
            <Text key={index}>{item.object.name}</Text>
          </Button>
        )}
        keyExtractor={(item, index) => item + index}
      /> */}
    </View>
  );
};
export default GroupProjList;
