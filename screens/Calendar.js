import React from "react";
import { Calendar, Agenda } from "react-native-calendars"; // 1.5.3
import { View, Text, StyleSheet } from "react-native";
var firebase = require("firebase");
import mobileApp from "../firebase";

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
  // loadItems(day) {
  //   setTimeout(() => {
  //     for (let i = -15; i < 85; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = this.timeToString(time);
  //       if (!this.state.items[strTime]) {
  //         this.state.items[strTime] = [];
  //         const numItems = Math.floor(Math.random() * 5);
  //         for (let j = 0; j < numItems; j++) {
  //           this.state.items[strTime].push({
  //             name: "Item for " + strTime,
  //             height: Math.max(50, Math.floor(Math.random() * 150))
  //           });
  //         }
  //       }
  //     }
  //     //console.log(this.state.items);
  //     const newItems = {};
  //     Object.keys(this.state.items).forEach(key => {
  //       newItems[key] = this.state.items[key];
  //     });
  //     this.setState({
  //       items: newItems
  //     });
  //   }, 1000);
  //   // console.log(`Load Items for ${day.year}-${day.month}`);
  // }
  render() {
    console.log("this state events", this.state);
    return (
      <View style={{ height: 600 }}>
        <Calendar
          items={this.state.items}
          // // callback that gets called when items for a certain month should be loaded (month became visible)
          // loadItemsForMonth={month => {
          //   console.log("trigger items loading");
          // }}
          // loadItemsForMonth={this.loadItems.bind(this)}
          // dayComponent={({ date, state }) => {
          //   return (
          //     <View style={{ flex: 1 }}>
          //       <Text
          //         style={{
          //           textAlign: "center",
          //           color: "black"
          //         }}
          //       >
          //         {date.day}
          //       </Text>
          //     </View>
          //   );
          // }}
          // // callback that fires when the calendar is opened or closed
          onCalendarToggled={calendarOpened => {
            console.log(calendarOpened);
          }}
          // // callback that gets called on day press
          onDayPress={day => {
            console.log("day pressed", day);
          }}
          // // callback that gets called when day changes while scrolling agenda list
          // onDayChange={day => {
          //   console.log("day changed");
          // }}
          // // initially selected day
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          // selected={"2018-10-01"}
          // // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={"2018-07-10"}
          // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={"2019-01-30"}
          // // Max amount of months allowed to scroll to the past. Default = 50
          // pastScrollRange={50}
          // // Max amount of months allowed to scroll to the future. Default = 50
          // futureScrollRange={50}
          // // specify how each item should be rendered in agenda
          renderItem={item => {
            // console.log(item)
            <View style={[styles.item, { height: item.height }]}>
              <Text>{item.name}</Text>
            </View>;
          }}
          // // specify how each date should be rendered. day can be undefined if the item is not first in that day.
          // renderDay={(day, item) => {
          //   return <View />;
          // }}
          renderDay={(day, item) => <Text>{day ? day.day : "item"}</Text>}
          // // specify how empty date content with no items should be rendered
          renderEmptyDate={() => {
            return (
              <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
              </View>
            );
          }}
          // // specify how agenda knob should look like
          renderKnob={() => {
            return <View />;
          }}
          // // specify what should be rendered instead of ActivityIndicator
          renderEmptyData={() => {
            return (
              <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
              </View>
            );
          }}
          // // specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => {
            return r1.name !== r2.name;
          }}
          // // Hide knob button. Default = false
          // hideKnob={true}
          // // By default, agenda dates are marked if they have at least one item, but you can override this if needed
          // markedDates={{
          //   "2018-10-02": {
          //     selected: true,
          //     marked: true,
          //     selectedColor: "magenta"
          //   },
          //   "2018-09-17": { marked: true, dotColor: "turqoise" },
          //   "2018-10-01": { marked: true, dotColor: "pink", activeOpacity: 0 },
          //   "2018-10-01": {
          //     marked: true,
          //     dotColor: "purple",
          //     activeOpacity: 0
          //   },
          //   "2018-10-19": {
          //     marked: true,
          //     dotColor: "orchid"
          //   }
          // }}
          markedDates={{
            // "2018-10-01": { textColor: "white" },
            // "2018-10-22": { startingDay: true, color: "turquoise" },
            // "2018-10-29": {
            //   selected: true,
            //   endingDay: true,
            //   color: "turqoise",
            //   textColor: "white"
            // }
            // "2018-11-04": {
            //   disabled: true,
            //   startingDay: true,
            //   color: "green",
            //   endingDay: true
            // }
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
          // // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
          // onRefresh={() => console.log("refreshing...")}
          // // Set this true while waiting for new data from a refresh
          // refreshing={false}
          // // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
          // refreshControl={null}
          // // agenda theme
          // theme={{
          //   agendaDayTextColor: "yellow",
          //   agendaDayNumColor: "green",
          //   agendaTodayColor: "red",
          //   agendaKnobColor: "blue"
          // }}
          style={{
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
          }}
        />
        <Text>testing</Text>
      </View>
    );
  }

  // loadItems(day) {
  //   setTimeout(() => {
  //     for (let i = 0; i < 10; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = this.timeToString(time);
  //       if (!this.state.items[strTime]) {
  //         this.state.items[strTime] = [];
  //         const numItems = Math.floor(Math.random() * 5);
  //         for (let j = 0; j < numItems; j++) {
  //           this.state.items[strTime].push({
  //             name: "Item for " + strTime,
  //             height: Math.max(50, Math.floor(Math.random() * 150))
  //           });
  //         }
  //       }
  //     }
  //     //console.log(this.state.items);
  //     const newItems = {};
  //     Object.keys(this.state.items).forEach(key => {
  //       newItems[key] = this.state.items[key];
  //     });
  //     this.setState({
  //       items: newItems
  //     });
  //   }, 100000);
  //   // console.log(`Load Items for ${day.year}-${day.month}`);
  // }
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
