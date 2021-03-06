import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { Text, StyleSheet, Pressable, View, Image } from 'react-native';
import moment from 'moment';
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';


export default function EventListItem({ navigation, item, userReports }) {
  console.log(item);
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold
  });

  let timeToShow = 0;

  if (item.time != undefined) {
    timeToShow = moment(item.time.toDate()).format('dddd, h:mm:ss a');
    console.log('time in item', timeToShow);
  } else {
    timeToShow = '';
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate('EventScreen', {
              data: item,
              userReports: userReports
            });
          }}
        >
          <View style={styles.content}>
            <View style={styles.imageContainer}>
              <Image
                source={
                  item.image
                    ? { uri: item.image }
                    : require('../assets/placeholderMap.jpg')
                }
                resizeMode="cover"
                style={styles.image}
              />
            </View>
            <View style={styles.textcontent}>
              <Text style={styles.header}>Topic: {item.topic}</Text>
              {item.description.length > 80 ? (
                <Text style={styles.text}>
                  {item.description.substring(0, 80)}...
                </Text>
              ) : (
                <Text style={styles.text}>
                  {item.description.substring(0, 80)}
                </Text>
              )}

              <Text style={styles.text}>{timeToShow}</Text>

              <View style={styles.containerButton}>
                {item.status == 'pending' && (
                  <View
                    style={[styles.statusView, { backgroundColor: 'gray' }]}
                  >
                    <Text style={[styles.textStatus, { color: 'white' }]}>
                      Status: {item.status}
                    </Text>
                  </View>
                )}
                {item.status == 'processing' && (
                  <View
                    style={[styles.statusView, { backgroundColor: 'yellow' }]}
                  >
                    <Text style={[styles.textStatus, { color: 'black' }]}>
                      Status: {item.status}
                    </Text>
                  </View>
                )}
                {item.status == 'resolved' && (
                  <View
                    style={[styles.statusView, { backgroundColor: 'green' }]}
                  >
                    <Text style={[styles.textStatus, { color: 'white' }]}>
                      Status: {item.status}
                    </Text>
                  </View>
                )}

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
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    width: '95%',
    backgroundColor: '#FFF',
    margin: '2%',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 25,
    elevation: 10,
    shadowColor: '#000',
    padding: '1%'
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
    paddingTop: '5%',
    width: '50%',
    flex: 1,
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'flex-start'
  },
  image: {
    height: 100,
    width: 100,
    overflow: 'hidden',
    borderRadius: 25
  },
  textcontent: {
    width: '100%',
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  header: {
    color: '#112454',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '7%',
    fontSize: 16,
    fontFamily: 'OpenSans_600SemiBold'
  },
  text: {
    display: 'flex',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '1%',
    paddingBottom: '1%',
    fontFamily: 'OpenSans_400Regular',
    fontSize: 14,
    color: '#112454'
  },
  containerButton: {
    display: 'flex',
    width: '100%',
    padding: '5%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 25,
    flexDirection: 'row'
  },
  buttonContent: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#888',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    borderRadius: 25
  },
  statusView: {
    padding: 4,
    borderRadius: 10,
    marginRight: 10,
    width: '80%',
    alignItems: 'center'
  },
  textStatus: {
    display: 'flex',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '1%',
    marginBottom: '1%',
    fontFamily: 'OpenSans_400Regular',
    fontSize: 14
  }
});
