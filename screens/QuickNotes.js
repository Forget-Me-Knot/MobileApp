import React from "react";
import firebase from '../firebase'
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";

export default class QuickNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handlePress = this.handlePress.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  handlePress() {
		const user = firebase.auth().currentUser
		const noteid = Math.floor(Math.random() * 100000)
		firebase.database().ref('notes/' + noteid).set({
			author: user.uid,
			content: this.state.note
		})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={{ fontSize: 30, textAlign: "center" }}>
            {" "}
            Wait! Write that down! That's a GREAT idea!
          </Text>
          <Image
            source={
              __DEV__
                ? require("../assets/images/writing-feather-png-2.png")
                : require("../assets/images/writing-feather-png-2.png")
            }
            style={styles.welcomeImage}
          />
        </View>

        <View
          style={{
            padding: 10,
            margin: 15
          }}
        >
          <TextInput
            style={{
              width: 300,
              height: 50,
              backgroundColor: "white",
              marginBottom: 20,
              padding: 5
            }}
            placeholder="What would you like to say?"
            onChangeText={text => this.setState({ note: text })}
            value={this.state.note}
            multiline={true}
          />
          <TouchableOpacity>
            <Button
              title="Press Me"
              color="#841584"
              onPress={this.handlePress}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
    alignItems: "center",
    marginTop: 15
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    margin: 20,
    alignContent: "center"
  }
});
