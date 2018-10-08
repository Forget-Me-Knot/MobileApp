import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../firebase';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      const ref = firebase.database().ref();
      ref.on('value', function(snapshot) {
        const photos = snapshot.val().photos;
        const projects = snapshot.val().projects;
        let myPhotos = [];
        let myProjects = [];
        let colors = {};
        for (var key in projects) {
          if (projects[key].members.includes(user.email)) {
            myProjects.push(key);
            colors[key] = projects[key].color;
          }
        }
        for (var id in photos) {
          if (myProjects.includes(photos[id].projectId + '')) {
            myPhotos.push({
              ...photos[id],
              key: id,
              color: colors[photos[id].projectId],
            });
          }
        }
        self.setState({ photos: myPhotos });
      });
    });
  }

  render() {
    const nav = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.state.photos
          ? this.state.photos.map(photo => (
              <Image
                key={photo.key}
                style={{
                  width: 100,
                  height: 100,
                  margin: 10,
                }}
                source={{ uri: photo.images[0].uri }}
              />
            ))
          : null}
        <Button
          title="NEW PHOTO"
          buttonStyle={{
            width: '100%',
            height: 45,
            borderRadius: 5,
            marginTop: 10,
          }}
          onPress={() => {
            nav.navigate('CreatePhoto');
          }}
        />
      </View>
    );
  }
}
