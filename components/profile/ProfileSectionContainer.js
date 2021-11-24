import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Divider, IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';

// renders sections of the profile conditionally
// this biolerplate approach is used instead of props.children
// because of layout issues that resulted when props.children was initially used.

const ProfileSectionContainer = ({ visible, title, action, type }) => {
  const currentUser = useSelector((state) => state.currentUser);

  if (!visible) return null;

  const DataList = ({ text, data }) => {
    const [visibleList, setList] = useState(false);
    return (
      <View>
        {text && (
          <TouchableOpacity
            onPress={() => setList(!visibleList)}
            style={[styles.listHeader]}
          >
            <Text style={[{ color: '#fff' }]}>{text}</Text>
            <IconButton
              color="#fff"
              icon={visibleList ? 'menu-up' : 'menu-down'}
            ></IconButton>
          </TouchableOpacity>
        )}
        {visibleList && (
          <FlatList
            renderItem={({ item }) => <Text style={styles.text}>{item}</Text>}
            keyExtractor={(item) => item}
            horizontal={true}
            data={data}
          ></FlatList>
        )}
      </View>
    );
  };

  const PersonalData = () => {
    return (
      <View>
        <Text style={[styles.text]}> {currentUser?.email} </Text>
        <Text style={[styles.text]}> {currentUser?.name} </Text>
        {currentUser?.pets.length && (
          <DataList text="Pets" data={currentUser?.pets} />
        )}
        {currentUser?.pets.length && (
          <DataList
            text="Means of Transport"
            data={currentUser?.transportType}
          />
        )}
        <Divider />
        {currentUser?.employmentStatus && (
          <Text style={[styles.text]}>
            {`Employment status:  ${currentUser?.employmentStatus}`}
          </Text>
        )}
        {currentUser?.housingType && (
          <Text style={[styles.text]}>
            {`Housing type:  ${currentUser?.housingType}`}
          </Text>
        )}
      </View>
    );
  };

  const Interests = () => {
    return (
      <View style={styles.interests}>
        {currentUser?.interests?.map((item) => (
          <Text key={item} style={styles.text}>
            {item}
          </Text>
        ))}
      </View>
    );
  };

  const Events = () => {
    return (
      <View style={styles.header}>
        <Text style={[styles.text]}> item one </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.text, { fontWeight: 'bold' }]}> {title} </Text>
        {action}
      </View>
      {type === 'personalData' && <PersonalData />}
      {type === 'interests' && <Interests />}
      {type === 'events' && <Events />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    height: 25,
    marginTop: 4,
    borderRadius: 4,
    backgroundColor: '#112454'
  },
  interests: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  text: {
    padding: 10,
    color: '#566787'
  },
});

export default ProfileSectionContainer;
