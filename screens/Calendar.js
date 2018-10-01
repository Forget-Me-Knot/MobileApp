import React from "react";
import { Calendar, Agenda } from "react-native-calendars"; // 1.5.3
import { View, Text, StyleSheet } from "react-native";
var firebase = require("firebase");
import mobileApp from "../firebase";

export default class WeekCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    const user = firebase.auth().currentUser;
    var self = this;
    var ref = firebase.database().ref("projects/caps/events");
    ref.on("value", function(snapshot) {
      var myEvents = [];
      let events = snapshot.val();
      // //   let eventsZ = events[events];
      //   console.log("eventsZero", eventsZ);
      console.log("events", events);
      //   events.forEach(item => {
      //     myEvents.push(item);
      //   });
      myEvents.push(events);
      //   for (var key in events) {
      //     if (events[key]) myEvents.push(events[key]);
      //   }
      self.setState({ items: myEvents });
    });
  }

  render() {
    console.log("this state events", this.state.items);
    return (
      <Agenda
        items={this.state.items}
        // loadItemsForMonth={this.loadItems.bind(this)}
        selected={"2018-07-21"}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        onDayPress={day => {
          console.log("selected day", day);
        }}
        theme={{
          dotColor: "#BF3FBF",
          selectedDotColor: "#7F3FBF",
          selectedDayBackgroundColor: "#7F3FBF"
        }}
        // onPressArrowLeft={substractMonth => substractMonth()}
        // onPressArrowRight={addMonth => addMonth()}
        // markingType={'period'}
        // markedDates={{this.state.events}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        renderDay={(day, item) => <Text>{day ? day.day : "item"}</Text>}
        // onPress={() => console.log(this)}
        //         const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
        // const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
        // const workout = {key:'workout', color: 'green'};
        //         <Calendar
        //   // Collection of dates that have to be marked. Default = {}
        //   markedDates={{
        //     '2012-05-16': {selected: true, marked: true, selectedColor: 'blue'},
        //     '2012-05-17': {marked: true},
        //     '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
        //     '2012-05-19': {disabled: true, disableTouchEvent: true}
        //   }}
        // />
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

// function writeProjectData(projectId, name, members, events) {
//   //   let members = {};
//   //   member.forEach(m => {
//   //     members[m] = true;
//   //   });
//   firebase
//     .database()
//     .ref("projects/" + projectId)
//     .set({
//       name: name,
//       members: members,
//       events: events
//     });
// }

// writeProjectData(
//   "caps",
//   "Caps",
//   ["syun", "jdavis"],
//   [
//     {
//       event: "codeReview",
//       day: 2,
//       month: 10,
//       year: 2018,
//       timestamp: 1538512200000,
//       dateString: "2018-10-02"
//     },
//     {
//       event: "testingCal",
//       day: 1,
//       month: 10,
//       year: 2018,
//       timestamp: 1538420772,
//       dateString: "2018-10-01"
//     }
//   ]
// );
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
