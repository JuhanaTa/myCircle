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
            <Text style={[{ color: '#007bff' }]}>{text}</Text>
            <IconButton
              color="#007bff"
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
      <View style={{ flex: 1 }}>
        <Text style={[styles.text]}> {currentUser?.email} </Text>
        <Text style={[styles.text]}> full name:  {currentUser?.fullname} </Text>

        {currentUser?.pets.length > 0 && (
          <DataList text="Pets" data={currentUser?.pets} />
        )}
        {currentUser?.transportType.length > 0 && (
          <DataList
            text="Means of Transport"
            data={currentUser?.transportType}
          />
        )}
        <Divider />
        {currentUser?.employmentStatus !== '' && (
          <Text style={[styles.text]}>
            {`Employment status:  ${currentUser?.employmentStatus}`}
          </Text>
        )}
        {currentUser?.housingType !== '' && (
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
        {currentUser.interests.length > 0 &&
          currentUser?.interests?.map((item) => (
            <Text key={item} style={styles.text}>
              {item}
            </Text>
          ))}
        {!currentUser?.interests.length && (
          <Text style={{ paddingLeft: 10, paddingTop: 10 }}>
            Set your interests to receive personalised content
          </Text>
        )}
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
    flex: 1,
    justifyContent: 'flex-start'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  listHeader: {
    flex: 1,
    marginLeft: '2%',
    marginRight: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    height: 25,
    marginTop: 4,
    borderRadius: 4,
    backgroundColor: '#FFF'
  },
  interests: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  text: {
    padding: 10,
    color: '#112454'
  }
});

export default ProfileSectionContainer;
