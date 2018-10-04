import React from 'react';
import { Calendar } from 'react-native-calendars'; // 1.5.3
import { View } from 'react-native';
var firebase = require('firebase');
import EventList from './EventList';

export default class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selected: {}
    };
  }
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    const user = firebase.auth().currentUser;
		var self = this;

		const ref = firebase.database().ref()
		ref.on('value', function(snapshot) {
			const projects = snapshot.val().projects
			let userProjects = []
			for (var key in projects) {
				if ( projects[key].members ) {
					const members = projects[key].members
					if ( members.includes(user.email) ) {
						userProjects.push('' + key)
					}
				}
			}
			const events = snapshot.val().events
			let userEvents = []
			let marked = {}
			for (var id in events ) {
				if (events[id]) {
					const projectId = '' + events[id].projectId
					if (userProjects.includes(projectId)) {
						userEvents.push({...events[id], key: id})
					}
					const color = events[id].color
					const date = events[id].date.dateString
					marked[date] = { selectedColor: '#' + color, selected: true}
				}
			}
			self.setState({ items: userEvents });
      self.setState({ selected: marked });
		})
  }

  render() {
    return (
      <View style={{ height: 600 }}>
        <Calendar
          items={this.state.items}
          minDate="2018-07-10"
          maxDate="2019-01-30"
          renderKnob={() => {
            return <View />;
          }}
          rowHasChanged={(r1, r2) => {
            return r1.name !== r2.name;
          }}
          markedDates={this.state.selected}
        />
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
    return date.toISOString().split('T')[0];
  }
}
