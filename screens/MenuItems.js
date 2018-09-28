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
      <View>
        <SectionList
          renderItem={({ item, index, section }) => (
            <Text key={index}>{item}</Text>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: "bold" }}>{title}</Text>
          )}
          sections={[
            { title: "Title1", data: ["item1", "item2"] },
            { title: "Title2", data: ["item3", "item4"] },
            { title: "Title3", data: ["item5", "item6"] }
          ]}
          keyExtractor={(item, index) => item + index}
        />
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

// export default withStyles(styles)(InsetDividers);
