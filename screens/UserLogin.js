import React, { Component } from "react";
var firebase = require("firebase");
import mobileApp from "../firebase";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button
} from "react-native";

export default class UserLogin extends Component {
  constructor() {
    super();
    this.state = { email: "", password: "" };

    this.loginSubmit = this.loginSubmit.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  loginSubmit() {
    const email = this.state.email;
    const pass = this.state.password;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .catch(function(error) {
        console.error(error);
      });
    const user = firebase.auth().currentUser;
    firebase
      .database()
      .ref("users/" + user.uid)
      .set({
        email: user.email
      });
    console.log(user.uid);
  }

  render() {
    return (
      <View>
        <Text> Welcome back! </Text>
        <TextInput
          title="email"
          onChangeText={email => this.setState({ email })}
          style={{ height: 40, backgroundColor: "white" }}
          placeholder="enter email here!"
        />
        <TextInput
          title="password"
          onChangeText={password => this.setState({ password })}
          style={{ height: 40, backgroundColor: "white" }}
          placeholder="enter your password"
        />
        <Button
          title="login"
          //   onPress={() => console.log("this stuff", this.state)}
          onPress={() => this.loginSubmit()}
        />
      </View>
    );
  }
}
