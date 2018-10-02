import React, { Component } from "react";
import { PropTypes } from "prop-types";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
	SectionList,
	SafeAreaView,
  View
} from "react-native";
import { Button } from "react-native-elements";
import { WebBrowser } from "expo";
import { Divider, Typography, Checkbox } from "react-native-material-ui";
import { MonoText } from "../components/StyledText";
import PersonalProjList from "./PersonalProjList";
import GroupProjList from "./GroupProjList";

const tasks = [
  "take out garbage",
  "get milk",
  "pay rent",
  "code something fabulous!"
];
class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false }
	}

  //make outside funcition. then bind to item.
  render() {
    return (
      <SafeAreaView style={{ marginTop: 10 }}>
        <ScrollView>
          {tasks.map(item => (
            <Checkbox
              label={item}
              checked={this.state.checked}
              value="agree"
              onCheck={checked => this.setState({ checked })}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const propTypes = {
  /**
   * Text will be shown after Icon
   */
  label: PropTypes.string,
  /**
   * Value will be returned when onCheck is fired
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /**
   * True if it's check
   */
  checked: PropTypes.bool,
  /**
   * Is checkbox active
   */
  disabled: PropTypes.bool,
  /**
   * Will be shown when checked is false
   */
  uncheckedIcon: PropTypes.string,
  /**
   * Will be shown when checked is true
   */
  checkedIcon: PropTypes.string,
  /**
   * Event that is called when state is changed
   */
  onCheck: PropTypes.func
};

const defaultProps = {
  checkedIcon: "check-box",
  uncheckedIcon: "check-box-outline-blank",
  disabled: false,
  style: {}
};

export default ToDo;

// import { ListItem } from 'react-native-material-ui';

// render() {
//     <View>
//       <ListItem
//         divider
//         centerElement={{
//           primaryText: 'Primary text',
//         }}
//         onPress={() => {}}
//       />
//     </View>
// }
