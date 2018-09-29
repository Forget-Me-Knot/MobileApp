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
  TextInput
} from "react-native";
import { Button } from "react-native-elements";
import { Divider } from "react-native-material-ui";

export default class Login extends Component {
  constructor() {
    super();
    this.state = { email: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
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
        <Text
          style={{
            backgroundColor: "rgba(127, 63, 191, 0.8)",
            borderColor: "transparent",
            borderWidth: 2,
            borderRadius: 3,
            marginBottom: 5,
            fontSize: 30,
            textAlign: "center"
          }}
        >
          {" "}
          Gotta Login!{" "}
        </Text>
        <Text
          style={{
            backgroundColor: "rgba(63, 191, 191, 0.8)",
            borderColor: "transparent",
            borderWidth: 2,
            borderRadius: 3,
            marginBottom: 5,
            fontSize: 20,
            textAlign: "center"
          }}
        >
          {" "}
          New here?
        </Text>
        <Text
          style={{
            backgroundColor: "rgba(191, 63, 191, 0.8)",
            borderColor: "transparent",
            borderWidth: 2,
            borderRadius: 3,
            marginBottom: 5,
            fontSize: 20,
            textAlign: "center"
          }}
        >
          {" "}
          sign-up!
        </Text>
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
          title="sign-up"
          //   onPress={() => console.log("this stuff", this.state)}
          style={{
            backgroundColor: "rgba(191, 63, 176, 0.4)"
          }}
          onPress={() => this.handleSubmit()}
        />
        <Divider />
        <Text
          style={{
            backgroundColor: "rgba(63, 191, 191, 0.8)",
            borderColor: "transparent",
            borderWidth: 2,
            borderRadius: 3,
            marginBottom: 5,
            fontSize: 20,
            textAlign: "center"
          }}
        >
          {" "}
          You look familiar.
        </Text>
        <Text
          style={{
            backgroundColor: "rgba(191, 63, 191, 0.8)",
            borderColor: "transparent",
            // borderWidth: 2,
            // borderRadius: 3,
            // marginBottom: 5,
            fontSize: 20,
            textAlign: "center"
          }}
        >
          {" "}
          Sign-in!
        </Text>
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
          title="Login"
          //   onPress={() => console.log("this stuff", this.state)}
          onPress={() => this.loginSubmit()}
        />
      </View>
    );
  }
}
