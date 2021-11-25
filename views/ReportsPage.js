import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {Button} from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import {LinearGradient} from 'expo-linear-gradient';
import {useSelector} from 'react-redux';
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
import EventList from '../components/EventList';
import firebase from 'firebase';


const ReportsPage = ({navigation}) => {
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
      let {status} = await Location.requestForegroundPermissionsAsync();
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

  const recentReports = [];

  reportsData.forEach(element => {
    if (element.userId == firebase.auth().currentUser.uid) {
      recentReports.push(element);
    }

  });


  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <LinearGradient colors={['#00c6ff', '#0072ff']} style={styles.background}>
        <>
          <ScrollView style={styles.list}>

            <View style={styles.container}>

              <View style={styles.logoContainer}>
                <Button
                  style={styles.button}
                  theme={{colors: {primary: '#007bff'}}}
                  onPress={async () => {
                    navigation.navigate('NewStack');
                  }}
                >
                  CREATE NEW REPORT
                </Button>
              </View>

              <View style={styles.listContainer}>
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


                  {recentReports.length > 0 ? (
                    <>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginLeft: 10,
                          marginRight: 10
                        }}
                      >
                        <Text style={styles.recentHeader}>
                          Your Reports
                        </Text>
                      </View>
                      <EventList
                        navigation={navigation}
                        reportsData={recentReports}
                      ></EventList>
                    </>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginLeft: 10,
                        marginRight: 10
                      }}
                    >
                      <Text style={styles.emptyData}>
                        You have not created any reports yet.
                      </Text>
                    </View>
                  )}

                </View>
              </View>
            </View>
          </ScrollView>
        </>
      </LinearGradient>
    );
  }
};

export default ReportsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },

  logoContainer: {
    display: 'flex',
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
    width: '100%',
    fontFamily: 'Inter_400Regular',
    marginTop: 10,
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

  emptyData: {
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingBottom: '2%',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#112454',
    
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
