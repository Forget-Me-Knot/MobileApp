import React, { Component } from "react";
// import  firebase  from "../firebase";
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
import { Divider } from "react-native-material-ui";

export default class Login extends Component {
  constructor() {
    super();
    this.state = { email: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }
  // static navigationOptions = {
  //   header: null
  // };

  handleSubmit() {
    // event.preventDefault();
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
        <Divider />
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
