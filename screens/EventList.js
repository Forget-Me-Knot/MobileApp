import React from 'react';
import { ScrollView, View } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import firebase from '../firebase'

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
		this._mounted = false;
		this.delete = this.delete.bind(this)
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillMount() {
    this._mounted = false;
	}

	delete(key){
		return firebase
			.database()
			.ref('events')
			.child(key)
			.remove()
	}

  render() {
    return (
      <ScrollView>
        <View>
          <List containerStyle={{ marginBottom: 45 }}>
            {this.props.curEvents.length ? (
              this.props.curEvents.map(l => (
                <ListItem
                  leftIcon={{
                    name: 'lens',
                    color: `#${l.color}`,
									}}
                  key={l.key}
									title={l.name}
									rightIcon={{ name: 'delete', style: { marginRight: 10 }}}
									onPressRightIcon={() => this.delete(l.key)}
                />
              ))
            ) : (
              <ListItem title="No events this month!" hideChevron />
            )}
          </List>
        </View>
      </ScrollView>
    );
  }
}
