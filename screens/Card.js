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

// import { MonoText } from "../components/StyledText";
import { Card } from "react-native-material-ui";
export default class Card extends React.Component {
  render() {
    return (
      <View>
        <Card>
          <Text>Hello world!</Text>
        </Card>
      </View>
    );
  }
}
// const propTypes = {
//     /**
//     * Called when card is pressed
//     */
//     onPress: PropTypes.func,
//     /**
//     * You can override any style for this card
//     */
//     style: PropTypes.object,
// };
