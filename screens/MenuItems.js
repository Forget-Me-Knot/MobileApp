import React, { Component } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  SectionList,
  View
} from "react-native";
import { WebBrowser } from "expo";
import { Divider, Avatar, List, Listitem } from "react-native-material-ui";
import PropTypes from "prop-types";
import { MonoText } from "../components/StyledText";

// // import List from "@material-ui/core/List";
// // import ListItem from "@material-ui/core/ListItem";
// // import ListItemText from "@material-ui/core/ListItemText";
// // import Avatar from "@material-ui/core/Avatar";
// // import ImageIcon from "@material-ui/icons/Image";
// // import WorkIcon from "@material-ui/icons/Work";
// // import BeachAccessIcon from "@material-ui/icons/BeachAccess";

// const styles = theme => ({
//   root: {
//     width: "100%",
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper
//   }
// });

class menuItems extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Text style={{ fontSize: 30 }}>
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
          <View style={{ flex: 1, padding: 10 }}>
            <SectionList
              renderItem={({ item, index, section }) => (
                <Text key={index}>{item}</Text>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={{ fontWeight: "bold" }}>{title}</Text>
              )}
              sections={[
                { title: "Profile", data: ["item1", "item2"] },
                { title: "Calendar", data: ["item3", "item4"] },
                { title: "Projects", data: ["item5", "item6"] }
              ]}
              keyExtractor={(item, index) => item + index}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default menuItems;
// function InsetDividers(props) {
//   const { classes } = props;
//   return (
//     <div className={classes.root}>
//       <List>
//         <ListItem>
//           <Avatar>
//             <ImageIcon />
//           </Avatar>
//           <ListItemText primary="Photos" secondary="Jan 9, 2014" />
//         </ListItem>
//         <li>
//           <Divider inset />
//         </li>
//         <ListItem>
//           <Avatar>
//             <WorkIcon />
//           </Avatar>
//           <ListItemText primary="Work" secondary="Jan 7, 2014" />
//         </ListItem>
//         <Divider inset component="li" />
//         <ListItem>
//           <Avatar>
//             <BeachAccessIcon />
//           </Avatar>
//           <ListItemText primary="Vacation" secondary="July 20, 2014" />
//         </ListItem>
//       </List>
//     </div>
//   );
// }

// InsetDividers.propTypes = {
//   classes: PropTypes.object.isRequired
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 10
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
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});

// export default withStyles(styles)(InsetDividers);
