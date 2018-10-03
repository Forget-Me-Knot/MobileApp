import React from "react";
import { Calendar, Agenda } from "react-native-calendars"; // 1.5.3
import { View, Text, StyleSheet } from "react-native";
import { Divider, Typography } from "react-native-material-ui";
var firebase = require("firebase");
import mobileApp from "../firebase";
import EventList from "./EventList";

export default class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selected: {} // nothing happens here, empty date will be rendered
    };
  }
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    const user = firebase.auth().currentUser;
    var self = this;
    var ref = firebase.database().ref("events");
    ref.on("value", function(snapshot) {
      var myEvents = [];
      let marked = {};
      let events = snapshot.val();

      for (var key in events) {
        let people = events[key].members.includes(user.email);

        if (people) {
          myEvents.push(events[key]);
          let marker = {};
          // console.log("my events", myEvents);
          // console.log("this user id", user.email);
          let { color } = events[key];
          let str = events[key].date.dateString;
          marked[str] = { selectedColor: color, selected: "true" };
          console.log("marker", marker);
        }
      }
      self.setState({ items: myEvents });
      self.setState({ selected: marked });
    });
  }

  render() {
    console.log("this state events", this.state);
    return (
      <View style={{ height: 600 }}>
        <Calendar
          items={this.state.items}
          onCalendarToggled={calendarOpened => {
            console.log(calendarOpened);
          }}
          onDayPress={day => {
            console.log("day pressed", day);
          }}
          minDate={"2018-07-10"}
          maxDate={"2019-01-30"}
          renderDay={(day, item) => <Text>{day ? day.day : "item"}</Text>}
          renderKnob={() => {
            return <View />;
          }}
          rowHasChanged={(r1, r2) => {
            return r1.name !== r2.name;
          }}
          markedDates={this.state.selected}

          // markingType={"period"}
        />
        <Text style={{ fontSize: 20 }}>Event List!</Text>
        return this.state.items.length?(
        <EventList events={this.state.items} />
        ):()
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: "white",
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginRight: 10,
//     marginTop: 17
//   },
//   emptyDate: {
//     height: 15,
//     flex: 1,
//     paddingTop: 30
//   }
// });
// var firebase = require("firebase");
//import mobileApp from "../firebase";

// const listC = [
//   // {
//   name: "Capstone",
//   members: ["stella@email.com", "kristin@email.com"],
//   events: ["x"],
//   color: "pink",
//   notes: ["x"],
//   todo: ["x"]
// },
// {
//   name: "Life",
//   members: ["stella@email.com", "kristin@email.com"],
//   events: ["x"],
//   color: "aqua",
//   notes: ["x"],
//   todo: ["x"]
// },
// {
//   name: "Career",
//   members: ["stella@email.com", "kristin@email.com"],
//   events: ["x"],
//   color: "plum",
//   notes: ["x"],
//   todo: ["x"]
// },
// {
//   name: "Plan Event",
//   members: ["stella@email.com", "kristin@email.com"],
//   events: ["x"],
//   color: "lightgreen",
//   notes: ["x"],
//   todo: ["x"]
// },
// {
//   name: "Treat YO SELF",
//   members: ["stella@email.com", "kristin@email.com"],
//   events: ["x"],
//   color: "pink",
//   notes: ["x"],
//   todo: ["x"]
// }
// ];
// function writeProjectData(obj) {
//   const projectId = Math.floor(Math.random() * 1000);

//   firebase
//     .database()
//     .ref("projects/" + projectId)
//     .set({
//       name: obj.name,
//       members: obj.members,
//       events: obj.events,
//       color: obj.color,
//       notes: obj.notes,
//       todo: obj.todo
//     });
// }
// listC.forEach(item => writeProjectData(item));
