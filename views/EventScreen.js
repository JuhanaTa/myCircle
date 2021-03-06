import React, {useEffect, useState} from 'react';
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
import {LinearGradient} from 'expo-linear-gradient';
import {Button} from 'react-native-paper';
import {AntDesign} from '@expo/vector-icons';
import {useDispatch} from 'react-redux';
import {deleteOneReport, dislikeReport, likeReport} from '../reducers/reportReducer';
import firebase from 'firebase';
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold
} from '@expo-google-fonts/open-sans';
import MapView from 'react-native-maps';
import BackgroundImage from '../components/BackgorundCircle';

export default function EventScreen({navigation, route}) {
  const dispatch = useDispatch();
  const {data, userReports} = route.params;

  let activation;
  console.log(data);

  const userId = firebase.auth().currentUser.uid;
  if (data.votedPeople.includes(userId)) {
    activation = true;
    console.log('includes');
  } else {
    if(data.votedPeople[0] === 'no voting'){
      activation = true;
    } else {
      activation = false;
      console.log('not include');
    }

  }


  const [likes, setLikes] = useState(data.points);
  const [likeDisabled, setLikeDisabled] = useState(activation);

  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold
  });


  console.log('item data', data);
  console.log('user reports', userReports);

  const handleLiked = () => {
    dispatch(
      likeReport(data.key)
    );
    setLikes(likes + 1);
    setLikeDisabled(true);
  };

  const handleDislike = () => {
    dispatch(
      dislikeReport(data.key)
    );
    setLikes(likes - 1);
    setLikeDisabled(true);
  };


  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <LinearGradient colors={['#00c6ff', '#0072ff']} style={styles.background}>
        <BackgroundImage></BackgroundImage>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.textcontent}>
              <Text style={styles.header}>Topic: {data.topic}</Text>
              <Text style={styles.text}>{data.location.address}</Text>

              {data.image ? (
                <Image
                  source={{uri: data.image}}
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
                        image={require('../assets/icons/general/icons8-location-pin-96(1).png')}
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
                  theme={{colors: {primary: '#007bff'}}}
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
                    style={{backgroundColor: 'white', alignSelf: 'center'}}
                    theme={{colors: {primary: '#007bff'}}}
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
                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity disabled={likeDisabled} onPress={() => {
                      handleLiked();
                    }}>
                      <AntDesign
                        style={{backgroundColor: 'white', marginBottom: 2}}
                        name="arrowup"
                        size={30}
                        color= {likeDisabled ? 'gray' : "#007bff"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity disabled={likeDisabled} onPress={() => {
                      handleDislike();
                    }}>
                      <AntDesign
                        style={{
                          backgroundColor: 'white',
                          marginTop: 2,
                        }}
                        name="arrowdown"
                        size={30}
                        color= {likeDisabled ? 'gray' : "#007bff"} 
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
                    {likes}
                  </Text>
                </View>
              </View>

              {data.status == 'pending' && (
                <View style={[styles.statusView, {backgroundColor: 'gray'}]}>
                  <Text style={[styles.textStatus, {color: 'white'}]}>
                    Status: {data.status}
                  </Text>
                </View>
              )}
              {data.status == 'processing' && (
                <View
                  style={[styles.statusView, {backgroundColor: 'yellow'}]}
                >
                  <Text style={[styles.textStatus, {color: 'black'}]}>
                    Status: {data.status}
                  </Text>
                </View>
              )}
              {data.status == 'resolved' && (
                <View style={[styles.statusView, {backgroundColor: 'green'}]}>
                  <Text style={[styles.textStatus, {color: 'white'}]}>
                    Status: {data.status}
                  </Text>
                </View>
              )}

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
    paddingTop: '3%',
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
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 5
  },
  content: {
    backgroundColor: '#fff',
    flex: 1,
    width: '95%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
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
    shadowOffset: {width: 0, height: 0},
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
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#FFFF',
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 25
  },
  statusView: {
    width: '50%',
    padding: 4,
    borderRadius: 10,
    marginLeft: '5%',
    alignItems: 'center'
  },
  textStatus: {
    display: 'flex',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '1%',
    marginBottom: '1%',
    padding: 4,
    fontFamily: 'OpenSans_400Regular',
    fontSize: 14
  }
});
