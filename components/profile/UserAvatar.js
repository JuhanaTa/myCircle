import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SvgUri, SvgCssUri } from 'react-native-svg';

const UserAvatar = () => {
  return (
    <View style={styles.container}>
      <SvgCssUri
        width="250"
        height="250"
        uri='https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=Prescription02&hairColor=Blonde&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Close&eyebrowType=Angry&mouthType=Tongue&skinColor=Yellow'
      />
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
