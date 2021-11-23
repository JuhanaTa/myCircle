import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { Text, StyleSheet, Pressable, View, Image } from 'react-native';
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
  OpenSans_800ExtraBold_Italic
} from '@expo-google-fonts/open-sans';

const uri = 'https://reactjs.org/logo-og.png' ;

export default function EventListItem({ navigation, item }) {
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate('EventScreen', {
              data: item
            });
          }}
        >
          <View style={styles.content}>
            <View style={styles.imageContainer}>
             <Image
                source={{ uri: item.image ? item.image : uri }}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
            <View style={styles.textcontent}>
              <Text style={styles.header}>Topic: {item.topic}</Text>
              <Text style={styles.text}>{item.description}</Text>
              <View style={styles.containerButton}>
                <View style={styles.buttonContent}>
                  <AntDesign
                    style={styles.buttonArrow}
                    name="right"
                    size={18}
                    color="#007bff"
                  />
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  button: {
    width: 380,
    backgroundColor: '#FFF',
    margin: '2%',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 25,
    elevation: 10,
    shadowColor: '#000'
  },

  content: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  imageContainer: {
    margin: '3%',
    width: '50%',
    flex: 1,
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 90,
    width: 90,
    overflow: 'hidden',
    borderRadius: 25
  },
  textcontent: {
    width: '100%',
    flex: 2,
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    color: '#112454',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '5%',
    fontSize: 16,
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
    padding: '5%',
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
