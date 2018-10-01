import React from "react";
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

// const style = {
//   background: "azure",
//   borderRadius: 3,
//   border: 0,
//   color: "cyan",
//   height: 48,
//   padding: "0 30px",
//   boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
// };

export default class QuickNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      entries: []
    };
    this.handlePress = this.handlePress.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  handlePress() {
    const newName = this.state.title;
    const newText = this.state.text;
    const newEntry = { title: newName, text: newText };
    this.setState({
      entries: [...this.state.entries, newEntry]
    });
    console.log("Entries: ", this.state.entries);
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
              width: 200,
              height: 30,
              backgroundColor: "white",
              marginBottom: 20,
              padding: 5
            }}
            placeholder="Title"
            onChangeText={text => this.setState({ title: text })}
            value={this.state.title}
            multiline={true}
          />
          <TextInput
            style={{
              width: 300,
              height: 50,
              backgroundColor: "white",
              marginBottom: 20,
              padding: 5
            }}
            placeholder="What would you like to say?"
            onChangeText={text => this.setState({ text: text })}
            value={this.state.text}
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
  contentContainer: {
    paddingTop: 30
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
