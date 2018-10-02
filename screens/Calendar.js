import React from "react";
import { Calendar, Agenda } from "react-native-calendars"; // 1.5.3
import { View, Text, StyleSheet } from "react-native";
var firebase = require("firebase");
import mobileApp from "../firebase";

export default class WeekCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectedDates: {}
    };
  }
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    // const user = firebase.auth().currentUser;
    var self = this;
    var ref = firebase.database().ref("events");
    ref.on("value", function(snapshot) {
      var myEvents = [];
      let events = snapshot.val();
      let singleEvent = {};
      // //   let eventsZ = events[events];
      //   console.log("eventsZero", eventsZ);
      console.log("events", events);
      singleEvent[events.date.dateString] ==
        { marked: true, dotColor: "blue", activeOpacity: 0 };
      //   singleEvent[events.date.dateString] = { marked: true, dotColor: "blue" };
      //   singleEvent.description = events.name;
      //   singleEvent.style = { marked: true, dotColor: "blue" };
      //filter if memberId == thisuser.id

      myEvents.push(events);
      //   for (var key in events) {
      //     if (events[key]) myEvents.push(events[key]);
      console.log("my events", myEvents);
      //   }
      self.setState({ items: myEvents });
      self.setState({ selectedDates: singleEvent });
    });
  }

  render() {
    console.log("this state events", this.state);
    return (
      //   <Agenda
      //     minDate={"2018-07-21"}
      //     items={this.state.items}
      //     // loadItemsForMonth={this.loadItems.bind(this)}
      //     //   selectedDates={Date.now()}
      //     renderItem={this.renderItem.bind(this)}
      //     renderEmptyDate={this.renderEmptyDate.bind(this)}
      //     rowHasChanged={this.rowHasChanged.bind(this)}
      //     onDayPress={day => {
      //       console.log("selected day", day);
      //     }}
      //     theme={{
      //       dotColor: "#BF3FBF",
      //       selectedDotColor: "#7F3FBF",
      //       selectedDayBackgroundColor: "#7F3FBF"
      //     }}
      //     // onPressArrowLeft={substractMonth => substractMonth()}
      //     // onPressArrowRight={addMonth => addMonth()}
      //     // markingType={'period'}
      //     // markedDates={{this.state.events}
      //     // monthFormat={'yyyy'}
      //     // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
      //     markedDates={this.state.selectedDates}
      //     renderDay={(day, item) => <Text>{day ? day.day : "item"}</Text>}
      //     // onPress={() => console.log(this)}
      //     //         const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
      //     // const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
      //     // const workout = {key:'workout', color: 'green'};
      //   />
      <Calendar
        // Collection of dates that have to be marked. Default = {}
        markedDates={{
          "2018-10-02": {
            selected: true,
            marked: true,
            selectedColor: "magenta"
          },
          "2018-09-17": { marked: true, dotColor: "turqoise" },
          "2018-10-01": { marked: true, dotColor: "pink", activeOpacity: 0 },
          "2018-10-01": { marked: true, dotColor: "purple", activeOpacity: 0 },
          "2018-10-19": {
            marked: true,
            dotColor: "orchid"
          }
        }}
      />
    );
  }

  //   loadItems(day) {
  //     setTimeout(() => {
  //       for (let i = 0; i < 10; i++) {
  //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //         const strTime = this.timeToString(time);
  //         if (!this.state.items[strTime]) {
  //           this.state.items[strTime] = [];
  //           const numItems = Math.floor(Math.random() * 5);
  //           for (let j = 0; j < numItems; j++) {
  //             this.state.items[strTime].push({
  //               name: "Item for " + strTime,
  //               height: Math.max(50, Math.floor(Math.random() * 150))
  //             });
  //           }
  //         }
  //       }
  //       //console.log(this.state.items);
  //       const newItems = {};
  //       Object.keys(this.state.items).forEach(key => {
  //         newItems[key] = this.state.items[key];
  //       });
  //       this.setState({
  //         items: newItems
  //       });
  //     }, 100000);
  //     // console.log(`Load Items for ${day.year}-${day.month}`);
  //   }
  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.name}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
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

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});

// function writeEventData(name, members, projectId, date) {
//   //   let members = {};
//   //   member.forEach(m => {
//   //     members[m] = true;
//   //   });
//   firebase
//     .database()
//     .ref("events")
//     .set({
//       name: name,
//       members: members,
//       projectId: projectId,
//       date: date
//     });
// }
// writeEventData("Capstone: CodeReview", ["syun", "jdavis"], "Capstone", {
//   day: 2,
//   month: 10,
//   year: 2018,
//   timestamp: 1538512200000,
//   dateString: "2018-10-02"
// });
// // writeEventData("Capstone: CodeReview", ["syun", "jdavis"], "Capstone", {
// //   day: 2,
// //   month: 10,
// //   year: 2018,
// //   timestamp: 1538512200000,
// //   dateString: "2018-10-02"
// // });
// writeEventData(
//   "Capstone: Make Calendar Work!",
//   ["syun", "kristin"],
//   "Capstone",
//   {
//     day: 1,
//     month: 10,
//     year: 2018,
//     timestamp: 1538512200000,
//     dateString: "2018-10-01"
//   }
// );

// PeRSWzFbHyYb3iPBOCD2CqnN12H3;

// {
//     event: "testingCal",
//     day: 1,
//     month: 10,
//     year: 2018,
//     timestamp: 1538420772,
//     dateString: "2018-10-01"
//   }
// props to set on dates
// const vacation = { key: "vacation", color: "red", selectedDotColor: "blue" };
// const massage = { key: "massage", color: "blue", selectedDotColor: "blue" };
// const workout = { key: "workout", color: "green" };

/* <Calendar
  markedDates={{
    '2017-10-25': {dots: [vacation, massage, workout], selected: true, selectedColor: 'red'},
    '2017-10-26': {dots: [massage, workout], disabled: true},
  }},
  markingType={'multi-dot'}
/> */
// theme={{
//     backgroundColor: '#ffffff',
//     calendarBackground: '#ffffff',
//     textSectionTitleColor: '#b6c1cd',
//     selectedDayBackgroundColor: '#00adf5',
//     selectedDayTextColor: '#ffffff',
//     todayTextColor: '#00adf5',
//     dayTextColor: '#2d4150',
//     textDisabledColor: '#d9e1e8',
//     dotColor: '#00adf5',
//     selectedDotColor: '#ffffff',
//     arrowColor: 'orange',
//     monthTextColor: 'blue',
//     textDayFontFamily: 'monospace',
//     textMonthFontFamily: 'monospace',
//     textDayHeaderFontFamily: 'monospace',
//     textMonthFontWeight: 'bold',
//     textDayFontSize: 16,
//     textMonthFontSize: 16,
//     textDayHeaderFontSize: 16
//   }}
// />
