import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from '../firebase';
import { Keyboard, Picker, TextInput } from 'react-native';
import { Button, FormLabel } from 'react-native-elements';
import CameraRollPicker from 'react-native-camera-roll-picker';

export default class CreatePhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      selected: [],
      note: '',
      projects: [],
      selectedProject: '',
    };
    this.handlePress = this.handlePress.bind(this);
  }
  componentDidMount() {
    const self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        let userProjects = [];
        var ref = firebase.database().ref('projects');
        ref.on('value', function(snapshot) {
          let projects = snapshot.val();
          for (let key in projects) {
            if (projects[key].members) {
              const members = projects[key].members;
              const name = projects[key].name;
              if (members.includes(user.email)) {
                userProjects.push({ name, key });
              }
            }
          }
          self.setState({
            projects: userProjects,
            selectedProject: userProjects[0].key,
          });
        });
      }
    });
  }

  handlePress() {
    const self = this;
    const user = firebase.auth().currentUser;
    const proj = this.state.selectedProject;
    const image = this.state.selected;
    const newKey = firebase
      .database()
      .ref('photos/')
      .push().key;
    firebase
      .database()
      .ref('photos/' + newKey)
      .set({
        author: user.uid,
        content: this.state.note,
        projectId: proj,
        images: image,
      })
      .then(function() {
        self.setState({ note: '' });
      });
    Keyboard.dismiss();
  }

  getSelectedImages(images, current) {
    var num = images.length;

    this.setState({
      num: num,
      selected: images,
    });
  }

  render() {
    const projects = this.state.projects;
    const nav = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>
            <Text style={styles.bold}> {this.state.num} </Text> images have been
            selected
          </Text>
        </View>
        <CameraRollPicker
          scrollRenderAheadDistance={500}
          initialListSize={1}
          pageSize={3}
          removeClippedSubviews={false}
          groupTypes="SavedPhotos"
          batchSize={5}
          maximum={3}
          selected={this.state.selected}
          assetType="Photos"
          imagesPerRow={3}
          imageMargin={5}
          callback={this.getSelectedImages.bind(this)}
        />
        {/* </View> */}

        {/* <View style={styles.container}> */}
        <FormLabel>SELECT PROJECT: </FormLabel>
        <Picker
          selectedValue={this.state.selectedProject}
          itemStyle={{ height: 80, width: 200 }}
          onValueChange={selectedProject => this.setState({ selectedProject })}
        >
          {projects.map(project => (
            <Picker.Item
              label={project.name}
              value={project.key}
              key={project.key}
            />
          ))}
        </Picker>
        <FormLabel>{`ADD A CAPTION: \n`}</FormLabel>
        <TextInput
          style={{
            width: '100%',
            height: 100,
            backgroundColor: 'white',
            marginBottom: 20,
            padding: 5,
          }}
          onChangeText={text => this.setState({ note: text })}
          value={this.state.note}
          multiline={true}
        />
        <Button
          title="POST"
          buttonStyle={{
            width: '100%',
            height: 45,
            borderRadius: 5,
            marginTop: 10,
          }}
          onPress={() => {
            this.handlePress();
            nav.navigate('Photos');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 15,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
});
