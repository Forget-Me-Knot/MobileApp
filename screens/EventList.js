import React from 'react';
import { ScrollView, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Header, Title, Avatar } from 'native-base';

const EventList = props => {
  return (
    <ScrollView>
      <View>
        <List containerStyle={{ marginBottom: 150 }}>
          <Header>
            <Title>{props.curMonth}</Title>
          </Header>
          {props.curEvents.length ? (
            props.curEvents.map(l => (
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
};

export default EventList;
