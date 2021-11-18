import React from 'react';
import { StyleSheet, View } from 'react-native';
import {  SvgCssUri } from 'react-native-svg';

const UserAvatar = ({uri}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
      <SvgCssUri
        width="250"
        height="250"
        uri={uri}
      />
      </View>
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
