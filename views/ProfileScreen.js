import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Avatar } from 'react-native-paper';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Avatar.Icon size={64} icon="account" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ProfileScreen;
