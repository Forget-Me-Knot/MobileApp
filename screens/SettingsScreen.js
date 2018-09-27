import React from "react";
import { ExpoConfigView } from "@expo/samples";
// import { COLOR, ThemeContext, getTheme } from "react-native-material-ui";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "app.json"
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}
