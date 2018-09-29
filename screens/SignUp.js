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

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = { email: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  handleSubmit() {
    const email = this.state.email;
    const pass = this.state.password;
    console.log(this.state);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .catch(function(error) {
        console.error(error);
      });
  }

  render() {
    return (
      <View>
        <Text> Join the Party! </Text>
        <TextInput
          onChangeText={email => this.setState({ email })}
          title="email"
          style={{ height: 40, backgroundColor: "white" }}
          placeholder="enter email here!"
        />
        <TextInput
          title="password"
          placeholder="enter password!"
          style={{ height: 40, backgroundColor: "white" }}
          onChangeText={password => this.setState({ password })}
        />
        <Button
          title="signup"
          //   onPress={() => console.log("this stuff", this.state)}
          onPress={() => this.handleSubmit()}
        />
      </View>
    );
  }
}
