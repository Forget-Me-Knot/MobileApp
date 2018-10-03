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
//   {
//     task: "Do All The THINGS!",
//     members: ["stella@email.com", "kristin@email.com"],
//     project: "Capstone",
//     color: "pink",
//     date: {
//       day: 1,
//       month: 10,
//       year: 2018,
//       timestamp: 1538512200000,
//       dateString: "2018-10-01"
//     }
//   },
//   {
//     task: "Capstone: Make Calendar Work!",
//     members: ["kristin@email.com", "kristin"],
//     project: "Capstone",
//     color: "green",
//     date: {
//       day: 1,
//       month: 10,
//       year: 2018,
//       timestamp: 1538512200000,
//       dateString: "2018-10-01"
//     }
//   },
//   {
//     task: "Code Review!",
//     members: ["stella@email.com", "kristin@email.com", "katie@email.com"],
//     project: "Capstone",
//     color: "turqoise",
//     date: {
//       day: 2,
//       month: 10,
//       year: 2018,
//       timestamp: 1538512200000,
//       dateString: "2018-10-02"
//     }
//   },
//   {
//     task: "Capstone: Switch roles",
//     members: ["stella@email.com", "kristin@email.com", "katie@email.com"],
//     project: "Capstone",
//     color: "purple",
//     date: {
//       day: 3,
//       month: 10,
//       year: 2018,
//       timestamp: 1538512200000,
//       dateString: "2018-10-03"
//     }
//   },
//   {
//     task: " Make Everything Work",
//     members: ["stella@email.com", "kristin@email.com", "katie@email.com"],
//     project: "Capstone",
//     color: "pink",
//     date: {
//       day: 5,
//       month: 10,
//       year: 2018,
//       timestamp: 1538512200000,
//       dateString: "2018-10-05"
//     }
//   }
// ];
// function writeEventData(obj) {
//   const eventId = Math.floor(Math.random() * 1000);
//   //   //   let members = {};
//   //   //   member.forEach(m => {
//   //   //     members[m] = true;
//   //   //   });
//   firebase
//     .database()
//     .ref("events/" + eventId)
//     .set({
//       task: obj.task,
//       members: obj.members,
//       project: obj.project,
//       color: obj.color,
//       date: obj.date
//     });
// }
// listC.forEach(item => writeEventData(item));
