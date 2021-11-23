import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

// renders sections of the profile conditionally
// this biolerplate approach is used instead of props.children
// because of layout issues that resulted when props.children was initially used.

const ProfileSectionContainer = ({ visible, title, action, type }) => {
  const currentUser = useSelector((state) => state.currentUser);

  if (!visible) return null;

  const PersonalData = () => {
    return (
      <View>
        <Text style={[styles.text]}> {currentUser?.email} </Text>
        <Text style={[styles.text]}> {currentUser?.name} </Text>
      </View>
    );
  };

  const Interests = () => {
    return (
      <View>
        {currentUser.userInterests.interests?.map((item) => (
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
        <Text style={[styles.text, {fontWeight: 'bold'}]}> {title} </Text>
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
    backgroundColor: '#fff'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   
  },
  text: {
    padding: 10,
    color: '#566787'
  }
});

export default ProfileSectionContainer;
