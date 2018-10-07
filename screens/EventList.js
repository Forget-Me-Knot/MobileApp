import React from 'react';
import { ScrollView, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Header, Title, Body } from 'native-base';

const EventList = props => {
  return (
    <ScrollView>
      <View>
        <List containerStyle={{ marginBottom: 20 }}>
          <Header>
            <Title>{props.curMonth}</Title>
          </Header>
          {props.curEvents.map(l => (
            <ListItem
              //needs delete button
              leftIcon={{ name: 'lens', color: `#${l.color}` }}
              rightIcon={{ name: 'delete' }}
              key={l.key}
              title={l.name}
              hideChevron
            />
          ))}
        </List>
      </View>
    </ScrollView>
  );
};

export default EventList;
