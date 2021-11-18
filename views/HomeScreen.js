import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import * as Location from 'expo-location';
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
import HeatMapButton from '../components/HeatMapButton';
import EventListButton from '../components/EventListButton';
import { logOut } from '../controllers/firebaseController';
import TickAnimationWrapper from '../components/globalReUseAbles/TickAnimationWrapper.js';
import EventList from '../components/EventList';

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState([]);
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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        //navigation.popToTop();
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const reportsData = useSelector((store) => store.reports);
  //Show only 5 reports
  //this needs some logic to show relevant/newest reports
  const recentReports = reportsData.slice(0, 4);

  //dummy advertisement
  recentReports.unshift({
    description: 'Tule ja maista Lassen pullat!',
    image:
      'https://firebasestorage.googleapis.com/v0/b/mycircle-ca851.appspot.com/o/images%2FlassenLeipomo.png?alt=media&token=8cbda895-1832-40b8-8136-410fea11c9ef',
    location: {
      latitude: 60.4032739,
      latitudeDelta: 0,
      longitude: 24.8564713,
      longitudeDelta: 0
    },
    topic: 'Advertisement',
    userId: 'ad'
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <LinearGradient colors={['#00c6ff', '#0072ff']} style={styles.background}>
        <ScrollView style={styles.list}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.image}
                source={require('../assets/Logo.png')}
                resizeMode="contain"
              />
              <Button
                style={styles.button}
                theme={{ colors: { primary: '#007bff' } }}
                onPress={async () => {
                  await logOut();
                }}
              >
                Log out
              </Button>
            </View>
            <View style={styles.header}>
              <Text style={styles.mainHeader}>Welcome!</Text>
            </View>

            <TickAnimationWrapper />
            {location.length != 0 && (
              <HeatMapButton
                navigation={navigation}
                location={location}
                reportsData={reportsData}
              ></HeatMapButton>
            )}
            <View style={styles.listContainer}>
              {reportsData && (
                <View
                  style={{
                    width: '100%',
                    backgroundColor: '#f2f4f7',
                    paddingTop: '8%',
                    paddingBottom: '5%',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginLeft: 10,
                      marginRight: 10
                    }}
                  >
                    <Text style={styles.recentHeader}>
                      5 new events in your area
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('EventListScreen'),
                          { location: location };
                      }}
                    >
                      <Text style={styles.recentHeader}>More</Text>
                    </TouchableOpacity>
                  </View>
                  <EventList
                    navigation={navigation}
                    reportsData={recentReports}
                  ></EventList>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '15%',
    paddingLeft: '3%',
    paddingRight: '3%'
  },
  image: {
    height: 50,
    width: 100
  },

  button: {
    fontFamily: 'Inter_400Regular',
    marginTop: 5,
    marginLeft: 'auto',
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 44 / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  header: {
    width: '100%',
    paddingLeft: '3%',
    flex: 1
  },
  mainHeader: {
    color: '#fff',
    paddingLeft: '3%',
    paddingTop: '5%',
    paddingBottom: '4%',
    fontSize: 39,
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    fontFamily: 'Inter_700Bold'
  },
  subHeader: {
    paddingLeft: '4%',
    paddingBottom: '2%',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#112454'
  },
  recentHeader: {
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingBottom: '2%',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#112454'
  },
  content: {
    backgroundColor: '#f4f6f8'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  },
  listContainer: {
    flex: 1,
    padding: 0,
    width: '100%',
    paddingTop: '3%',
    margin: 0
  },
  listHeader: {
    color: '#112454',
    paddingLeft: '3%',
    paddingBottom: '5%',
    fontSize: 18,
    fontFamily: 'Inter_500Medium'
  },
  list: {
    flex: 1,
    width: '100%',
    padding: 0,
    margin: 0
  }
});
