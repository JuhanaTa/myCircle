import React from 'react';
import { FlatList, StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { SvgUri, SvgCssUri } from 'react-native-svg';
import getAvatarUri, { AVATAR_OPTIONS } from './avatarConfig';

const Option = ({ option }) => {
  return (
    <TouchableOpacity style={styles.avatarOption}>
      <Text>{`${option?.icon} ${option?.option}`}</Text>
    </TouchableOpacity>
  );
};

const AvatarGenerator = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={AVATAR_OPTIONS}
        renderItem={({item}) => <Option option={item} />}
        keyExtractor={(item) => item.option}
        horizontal={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarOption: {
    backgroundColor: '#ffffff',

    padding: 8,
    margin: 2,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8
  }
});

export default AvatarGenerator;
