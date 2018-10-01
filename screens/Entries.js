import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
import { Card, CardMedia } from "react-native-material-ui";
export default class Entries extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View>
        <Text style={{ fontSize: 40 }}>Hello world!</Text>
        <Card>
          <Image
            source={{
              uri: "https://cdn130.picsart.com/273014372023201.jpg?r1024x1024"
            }}
            style={{ width: 400, height: 400 }}
          />
        </Card>
      </View>
    );
  }
}
