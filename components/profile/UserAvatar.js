import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Avatar } from 'react-native-paper';

const UserAvatar = ({ image, size }) => {
  return (
    <View style={styles.container}>
      {image ? (
        <Avatar.Image
          size={size ? size : 250}
          source={{ uri: image }}
          style={styles.avatar}
        />
      ) : (
        <Avatar.Icon
          size={size ? size : 250}
          icon="account"
          style={styles.avatar}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    backgroundColor: '#112454',

    padding: 0,
    margin: 0,
    borderTopEndRadius: 250,
    borderTopStartRadius: 250,
    borderBottomRightRadius: 250,
    borderBottomLeftRadius: 250
  }
});

export default UserAvatar;
