import React from "react";
import { Calendar, Agenda } from "react-native-calendars"; // 1.5.3
import { View, Text, StyleSheet } from "react-native";
import { Divider, Typography } from "react-native-material-ui";
var firebase = require("firebase");
import mobileApp from "../firebase";
import EventList from "./EventList";

const listC = [
  {
    task: "Do All The THINGS!",
    memebers: ["syun", "kristin"],
    projects: "Capstone",
    date: {
      day: 1,
      month: 10,
      year: 2018,
      timestamp: 1538512200000,
      dateString: "2018-10-01"
    }
  },
  {
    task: "Capstone: Make Calendar Work!",
    memebers: ["syun", "kristin"],
    projects: "Capstone",
    date: {
      day: 1,
      month: 10,
      year: 2018,
      timestamp: 1538512200000,
      dateString: "2018-10-01"
    }
  },
  {
    task: "Code Review!",
    memebers: ["syun", "kristin"],
    projects: "Capstone",
    date: {
      day: 2,
      month: 10,
      year: 2018,
      timestamp: 1538512200000,
      dateString: "2018-10-02"
    }
  },
  {
    task: "Capstone: Switch roles",
    memebers: ["syun", "kristin"],
    projects: "Capstone",
    date: {
      day: 3,
      month: 10,
      year: 2018,
      timestamp: 1538512200000,
      dateString: "2018-10-03"
    }
  },
  {
    task: " Make Everything Work",
    memebers: ["syun", "kristin"],
    projects: "Capstone",
    date: {
      day: 5,
      month: 10,
      year: 2018,
      timestamp: 1538512200000,
      dateString: "2018-10-05"
    }
  }
];
export default class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        "2018-10-01": [
          {
            height: 100,
            name: "item for a test event1 if this ie being cut off tell me "
          },
          { height: 800, name: "item for a test event2 what about this one ?" }
        ],
        "2018-10-02": []
      } // nothing happens here, empty date will be rendered
    };
  }
  static navigationOptions = {
    header: null
  };
  // componentDidMount() {
  //   // const user = firebase.auth().currentUser;
  //   var self = this;
  //   var ref = firebase.database().ref("events");
  //   ref.on("value", function(snapshot) {
  //     var myEvents = [];
  //     let events = snapshot.val();
  //     let singleEvent = {};
  //     // //   let eventsZ = events[events];
  //     //   console.log("eventsZero", eventsZ);
  //     console.log("events", events);
  //     singleEvent[events.date.dateString] = {
  //       marked: true,
  //       dotColor: "blue",
  //       activeOpacity: 0
  //     };
  //     //   singleEvent[events.date.dateString] = { marked: true, dotColor: "blue" };
  //     //   singleEvent.description = events.name;
  //     //   singleEvent.style = { marked: true, dotColor: "blue" };
  //     //filter if memberId == thisuser.id

  //     myEvents.push(events);
  //     //   for (var key in events) {
  //     //     if (events[key]) myEvents.push(events[key]);
  //     console.log("my events", myEvents);
  //     //   }
  //     self.setState({ items: myEvents });
  //     self.setState({ selectedDates: singleEvent });
  //   });
  // }

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
          markedDates={{
            "2018-10-20": { textColor: "green" },
            "2018-10-22": { startingDay: true, color: "turquoise" },
            "2018-10-23": {
              selected: true,
              endingDay: true,
              color: "turquoise"
            },
            "2018-10-04": {
              startingDay: true,
              color: "pink",
              endingDay: true
            }
          }}
          markingType={"period"}
        />
        <Text style={{ fontSize: 20 }}>Event List!</Text>
        <EventList events={listC} />
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
