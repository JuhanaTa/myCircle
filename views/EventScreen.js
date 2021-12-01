import React from 'react';
import AppLoading from 'expo-app-loading';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { deleteOneReport } from '../reducers/reportReducer';

import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold
} from '@expo-google-fonts/open-sans';
import MapView from 'react-native-maps';

export default function EventScreen({ navigation, route }) {
  const dispatch = useDispatch();
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold
  });

  const { data, userReports } = route.params;
  console.log('item data', data);
  console.log('user reports', userReports);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <LinearGradient colors={['#00c6ff', '#0072ff']} style={styles.background}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.textcontent}>
              <Text style={styles.header}>Topic: {data.topic}</Text>
              <Text style={styles.text}>{data.location.address}</Text>

              {data.image ? (
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
              ) : (
                <Pressable
                  onPress={async () => {
                    navigation.navigate('MapScreen', {
                      oneItemLocation: data.location
                    });
                  }}
                >
                  <View style={styles.mapcontainer} pointerEvents="none">
                    <MapView
                      style={styles.map}
                      showsUserLocation={true}
                      initialRegion={{
                        latitude: data.location.latitude,
                        longitude: data.location.longitude,
                        latitudeDelta: 0.004,
                        longitudeDelta: 0.004
                      }}
                    >
                      <MapView.Marker
                        coordinate={data.location}
                      ></MapView.Marker>
                    </MapView>
                  </View>
                </Pressable>
              )}
              <View style={styles.buttonContainer}>
                <Button
                  icon="map-outline"
                  style={styles.buttonContent}
                  theme={{ colors: { primary: '#007bff' } }}
                  onPress={async () => {
                    navigation.navigate('MapScreen', {
                      oneItemLocation: data.location
                    });
                  }}
                >
                  Show on map
                </Button>

                {userReports && (
                  <Button
                    icon="delete"
                    style={{ backgroundColor: 'white', alignSelf: 'center' }}
                    theme={{ colors: { primary: '#007bff' } }}
                    onPress={async () => {
                      Alert.alert(
                        'Confirm deletion',
                        'Are you sure you want to delete this post?',
                        [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel'
                          },
                          {
                            text: 'OK',
                            onPress: () => {
                              dispatch(deleteOneReport(data.key));
                              navigation.popToTop();
                            }
                          }
                        ]
                      );
                    }}
                  >
                    Delete
                  </Button>
                )}
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity>
                      <AntDesign
                        style={{ backgroundColor: 'white', marginBottom: 2 }}
                        name="arrowup"
                        size={30}
                        color="#007bff"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <AntDesign
                        style={{ backgroundColor: 'white', marginTop: 2 }}
                        name="arrowdown"
                        size={30}
                        color="#007bff"
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      alignSelf: 'center',
                      color: '#007bff',
                      fontFamily: 'OpenSans_600SemiBold',
                      fontSize: 18
                    }}
                  >
                    0
                  </Text>
                </View>
              </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '5%',
    height: '100%'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    height: '100%'
  },
  button: {
    backgroundColor: 'red',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5
  },
  content: {
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
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
    color: '#112454'
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
    backgroundColor: '#fff',
    shadowColor: '#888',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },

  buttonContainer: {
    width: '90%',
    marginRight: 'auto',
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
    marginBottom: '5%'
  },

  map: {
    width: '100%',
    height: 200,
    borderRadius: 10
  },
  mapcontainer: {
    width: Dimensions.get('window').width - 20,
    backgroundColor: '#FFFF',
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 25
  }
});
