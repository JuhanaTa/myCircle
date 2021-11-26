import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import EventListItem from '../components/EventListItem';

export default function EventList({ navigation, reportsData }) {
  //console.log('reports data in event list',reportsData);
  //item that is rendered
  const renderItem = ({ item }) => (
    <EventListItem item={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.content}
        data={reportsData}
        renderItem={renderItem}
        keyExtractor={(item) =>
          `${item.key}${item.description}`
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    width: '100%'
  }
});
