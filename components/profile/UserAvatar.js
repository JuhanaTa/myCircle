import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Avatar } from 'react-native-paper';

const UserAvatar = ({ image, size }) => {
  return (
    <View >
      {image ? (
        <Avatar.Image size={size ? size : 64} source={{ uri: image }} />
      ) : (
        <Avatar.Icon size={size ? size : 64} icon="account" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default UserAvatar;
