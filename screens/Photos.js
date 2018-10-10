import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native';
import { Button, Tile, Avatar, Title } from 'react-native-elements';
import firebase from '../firebase';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
});

export default class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const self = this;
    firebase.auth().onAuthStateChanged(async function(user) {
      const photos = await firebase
        .database()
        .ref('photos')
        .once('value')
        .then(snap => snap.val());
      const projects = await firebase
        .database()
        .ref('/projects')
        .once('value')
        .then(snap => snap.val());
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
  }

  render() {
    const photos = this.state.photos;
    const nav = this.props.navigation;
    return (
      <SafeAreaView>
        <ScrollView>
          {photos
            ? photos.map(photo => (
                /* <Tile>
                  <Image
                    styleName="large-banner"
                    source={{
                      uri:
                        'https://shoutem.github.io/img/ui-toolkit/examples/image-5.png',
                    }}
                  />
                  <View styleName="content">
                    <Title>MAUI BY AIR THE BEST WAY AROUND THE ISLAND</Title>
                    <View styleName="horizontal space-between">
                      <Caption>1 hour ago</Caption>
                      <Caption>15:34</Caption>
                    </View>
                  </View>
                </Tile> */
                <View style={styles.root} key={photo.key}>
                  <Tile
                    imageSrc={{ uri: `${photo.url}` }}
                    title={photo.content}
                    titleStyle={{ fontSize: 20 }}
                    icon={{ name: 'lens', color: `#${photo.color}` }}
                    contentContainerStyle={{
                      height: 30,
                    }}
                    featured={true}
                  />
                </View>
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
        </ScrollView>
      </SafeAreaView>
    );
  }
}
