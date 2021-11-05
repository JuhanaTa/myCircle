import React from 'react';
import AppLoading from 'expo-app-loading';
import { Text, StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold
} from '@expo-google-fonts/open-sans';

export default function EventScreen({ navigation, route }) {
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold
  });

  const uri = { uri: 'http://placekitten.com/200/300' };

  const { data } = route.params;
  console.log('one item', data);
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <LinearGradient colors={['#eef4fb', '#dbe9f7']} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.textcontent}>
              <Text style={styles.header}>Topic: {data.topic}</Text>
              <Image
                source={require('../assets/placeholderMap.jpg')}
                style={{ width: '90%', height: 150, alignSelf: 'center' }}
                resizeMode="center"
              ></Image>
              <Image
                source={{ uri: data.image }}
                style={{
                  width: '90%',
                  height: 200,
                  alignSelf: 'center',
                  marginTop: 10
                }}
                resizeMode="center"
              ></Image>
              <Text style={styles.text}>{data.description}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: '5%'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  },
  button: {
    width: 380,
    backgroundColor: '#FFF',
    margin: '2%',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5
  },

  content: {
    flex: 1,
    width: '95%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
    margin: '2%',

    borderRadius: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5
  },
  imageContainer: {
    width: '100%',
    flex: 2,
    height: '20%',
    borderTopRightRadius: 25,
    overflow: 'hidden',
    borderTopLeftRadius: 25
  },
  textcontent: {
    width: '100%'
  },
  header: {
    color: '#112454',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '5%',
    paddingTop: '5%',
    fontSize: 20,
    fontFamily: 'OpenSans_600SemiBold'
  },
  text: {
    display: 'flex',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '2%',
    paddingBottom: '2%',
    fontFamily: 'OpenSans_400Regular',
    fontSize: 14,
    color: '#727aa3'
  },
  containerButton: {
    display: 'flex',
    width: '100%',
    padding: '2%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 25
  },
  buttonContent: {
    padding: '3%',
    backgroundColor: '#fff',
    shadowColor: '#888',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    borderRadius: 25
  }
});
