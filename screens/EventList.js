import React from 'react';
import { ScrollView, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Header, Title, Avatar } from 'native-base';

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this._mounted = false;
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillMount() {
    this._mounted = false;
  }

  render() {
    return (
      <ScrollView>
        <View>
          <List containerStyle={{ marginBottom: 150 }}>
            <Header>
              <Title>{this.props.curMonth}</Title>
            </Header>
            {this.props.curEvents.length ? (
              this.props.curEvents.map(l => (
                <ListItem
                  //needs delete button
                  leftIcon={{
                    name: 'lens',
                    color: `#${l.color}`,
                  }}
                  key={l.key}
                  title={l.name}
                  hideChevron
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
