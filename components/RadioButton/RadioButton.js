import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black
} from '@expo-google-fonts/inter';

export default function Radiobutton({ isChecked, text, onRadioButtonPress }) {
  // renders the report topics for user to choose from
  const _renderCheckedView = () => {
    return isChecked ? (
      <View style={[styles.radioButtonIconInnerIcon]} />
    ) : null;
  };
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <TouchableOpacity
        style={styles.mainContainer}
        onPress={onRadioButtonPress}
      >
        <View style={[styles.radioButtonIcon]}>{_renderCheckedView()}</View>
        <View style={[styles.radioButtonTextContainer]}>
          <Text style={styles.radioButtonText}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    marginLeft: '5%'
  },
  radioButtonIcon: {
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: '#112454',
    height: 20,
    width: 20,
    borderRadius: 30 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioButtonIconInnerIcon: {
    height: 15,
    width: 15,
    backgroundColor: '#112454',
    borderRadius: 25 / 2,
    borderWidth: 3,
    borderColor: 'white'
  },
  radioButtonTextContainer: {
    flex: 5,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10
  },
  radioButtonText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18,
    color: '#000'
  }
});
