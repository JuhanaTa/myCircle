import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import MapView, {Callout} from 'react-native-maps';
import * as Location from 'expo-location';
import {getReports} from '../controllers/firebaseController';
import AppLoading from 'expo-app-loading';

export default function MapScreen({navigation}) {


    const [coordinates, setCoordinates] = useState([]);
    const [currentLoc, setCurrentLoc] = useState([]);
    const [loading, setLoading] = useState(true);

    //console.log('loc of user', userLocation);

    // calculates distances between two different coordinates

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        console.log('calc', lat1, lon1, lat2, lon2);
        const R = 6371; // Radius of the earth in km
        const dLat = degreesToRadius(lat2 - lat1); // deg2rad below
        const dLon = degreesToRadius(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(degreesToRadius(lat1)) * Math.cos(degreesToRadius(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        console.log('distance', d);
        return d;
    };

    const degreesToRadius = (deg) => {
        return deg * (Math.PI / 180);
    };


    const getMapMarkers = async (userLocation) => {

        const newCoordinates = [];

        const reports = await getReports();
        console.log('reports', reports);

        reports.forEach(element => {


            if (element.location != '') {
                if (calculateDistance(element.location.latitude, element.location.longitude, userLocation.coords.latitude, userLocation.coords.longitude) <= 10) {
                    newCoordinates.push(element);
                } else {
                    console.log('too far');
                }

            }

        });

        setCoordinates(newCoordinates);
        setCurrentLoc(userLocation);
        setLoading(false);

    };


    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                //navigation.popToTop();
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location);

            getMapMarkers(location);
        })();
    }, []);


    if (loading) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                {loading != true &&
                    <MapView style={styles.map}
                        showsUserLocation={true}
                        initialRegion={{
                            latitude: currentLoc.coords.latitude,
                            longitude: currentLoc.coords.longitude,
                            latitudeDelta: 0.11,
                            longitudeDelta: 0.11
                        }}
                    >

                        {/*<MapView.Heatmap
                    points={points}
                    opacity={1}
                    radius={50}
                    maxIntensity={100}
                    gradientSmoothing={10}
                    heatmapMode={"POINTS_DENSITY"} /> */}

                        <MapView.Circle
                            center={{
                                latitude: currentLoc.coords.latitude,
                                longitude: currentLoc.coords.longitude,
                            }}
                            radius={3000}
                            strokeWidth={1}
                            strokeColor={'#1a66ff'}
                            fillColor={'rgba(230,238,255,0.5)'}
                        />
                        {coordinates.map(marker => (
                            <MapView.Marker
                                key={marker.location.description}
                                coordinate={marker.location}
                                title={marker.description}
                            >
                                <Callout onPress={() => {
                                    console.log('clicked marker view', marker);
                                    navigation.navigate('EventScreen', {
                                        data: marker
                                    });
                                }}>
                                    <View>
                                        <View style={{width: 200, height: 200, padding: 10}}>
                                            <Text>{marker.description}</Text>
                                        </View>
                                    </View>
                                </Callout>
                            </MapView.Marker>
                        ))}

                    </MapView>
                            
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
});