import React from "react";
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
import firebase from "../firebase";

import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";

export default class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={{
                uri: "https://cdn141.picsart.com/273128257001201.png?c480x480"
              }}
              style={{ width: 400, height: 400 }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

//   _handleHelpPress = () => {
//     WebBrowser.openBrowserAsync(
//       "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
//     );
//   };
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA"
  },

  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  }
});
