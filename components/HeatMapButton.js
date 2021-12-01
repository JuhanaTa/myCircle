import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Callout } from 'react-native-maps';
import {
  Text,
  StyleSheet,
  Pressable,
  Button,
  Alert,
  View,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
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
const image = { uri: 'https://reactjs.org/logo-og.png' };

export default function HeatMapButton({ navigation, location, reportsData }) {
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
      <Pressable
        style={styles.container}
        onPress={() => {
          navigation.navigate('MapScreen');
        }}
      >
        <Pressable style={styles.button} pointerEvents="none">
          <MapView
            style={styles.map}
            showsUserLocation={true}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.004,
              longitudeDelta: 0.004
            }}
          >
            <MapView.Circle
              center={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              }}
              radius={10000}
              strokeWidth={1}
              strokeColor={'#1a66ff'}
              fillColor={'rgba(230,238,255,0.5)'}
            />

            {reportsData.map((marker) => (
              <MapView.Marker
                key={`${marker.key}${marker.description}`}
                coordinate={marker.location}
              ></MapView.Marker>
            ))}
          </MapView>

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: 'flex-end',
              flexDirection: 'row'
            }}
          >
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
        </Pressable>
      </Pressable>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    borderRadius: 25,
    overflow: 'hidden',
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    width: Dimensions.get('window').width - 20,
    backgroundColor: '#FFFF',
    overflow: 'hidden',
    margin: '5%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 25
  },

  image: {
    width: '100%'
  },
  text: {
    width: '50%',
    padding: '5%',
    paddingLeft: '4%',
    paddingBottom: '2%',
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
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
    padding: '3%',
    backgroundColor: '#fff',
    shadowColor: '#888',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    borderRadius: 25
  },
  background: {
    padding: '1%',
    borderRadius: 25
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 10
  }
});
