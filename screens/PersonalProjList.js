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

// class PersonalProjList extends Component {
//   constructor() {
//     super();
//     this.state = {

//         static navigationOptions = {
//             header: null
//           };

// render() {
const PersonalProjList = props => {
  const personalProject = props.personalProjects;
  return (
    <View>
      <List>
        {personalProject.map(project => (
          <ListItem key={project.key} title={project.name} />
        ))}
      </List>
    </View>
  );
};

export default PersonalProjList;
