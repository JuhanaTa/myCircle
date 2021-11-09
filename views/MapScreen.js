import React, {useEffect, useState} from 'react';
import {Button, Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import MapView, {Callout} from 'react-native-maps';
import {helloFunction} from '../controllers/firebaseFunctions';
import * as Location from 'expo-location';
import {getReports} from '../controllers/firebaseController';
import AppLoading from 'expo-app-loading';

export default function MapScreen({navigation}) {


    const [coordinates, setCoordinates] = useState([]);
    const [userLocation, setUserLocation] = useState({});
    const [loading, setLoading] = useState(true);

    console.log('loc of user', userLocation);

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
                    //coordinates from reports
                    //newCoordinates.push({latitude: element.location.latitude, longitude: element.location.longitude, latitudeDelta: 0, longitudeDelta: 0});
                    newCoordinates.push(element);
                } else {
                    console.log('too far');
                }

            }

        });

        console.log('koordinaatit', coordinates);
        //setUserLocation({latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude, latitudeDelta: 0, longitudeDelta: 0});
        setCoordinates(newCoordinates);
        setLoading(false);

    };


    /*const displayMarkers = async () => {

        const [markers, setMarkers] = useState({});

        coordinates.forEach(element => {
            
        });

        return (
            <MapView.Marker
                coordinate={{
                    latitude: 65.012615,
                    longitude: 25.471453,
                }}
                title={'Default marker'}
            >
                <Callout onPress={() => {
                    console.log('clicked marker view');
                }}>
                    <View>
                        <View style={{width: 200, height: 200, padding: 10}}>
                            <Text>Test marker text. Lorem ipsum...</Text>
                        </View>
                    </View>
                </Callout>
            </MapView.Marker>
        );

    };*/

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

    let Image_Http_URL = {uri: 'http://placekitten.com/200/300'};
    let points = [
        {latitude: 65.012615, longitude: 25.461453, weight: 1},
        {latitude: 65.002615, longitude: 25.451453, weight: 1},
        {latitude: 65.022615, longitude: 25.441453, weight: 1}
    ];

    const item = {
        title: 'Test'
    };

    if (loading) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                {loading != true &&
                    <MapView style={styles.map}
                        showsUserLocation={true}
                        initialRegion={{
                            latitude: 65.012615,
                            longitude: 25.471453,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
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
                                latitude: 65.012615,
                                longitude: 25.471453
                            }}
                            radius={3000}
                            strokeWidth={1}
                            strokeColor={'#1a66ff'}
                            fillColor={'rgba(230,238,255,0.5)'}
                        />
                        {coordinates.map(marker => (
                            <MapView.Marker
                                key={marker.location.longitude}
                                coordinate={marker.location}
                                title={marker.description}
                            >
                                <Callout onPress={() => {
                                    console.log('clicked marker view');
                                }}>
                                    <View>
                                        <View style={{width: 200, height: 200, padding: 10}}>
                                            <Text>{marker.description}</Text>
                                        </View>
                                    </View>
                                </Callout>
                            </MapView.Marker>
                        ))}


                        <MapView.Marker
                            coordinate={{
                                latitude: 65.002615,
                                longitude: 25.461453,
                            }}
                            title={'Default marker 2'}>
                            <Callout onPress={() => {
                                console.log('clicked marker view');
                                navigation.navigate('EventScreen', {
                                    data: item
                                });
                            }}>
                                <View>
                                    <View style={{width: 200, height: 200, padding: 10}}>
                                        <Text>Test marker text. Kuva Lorem ipsum...</Text>
                                        <Image source={require("../assets/placeholderMap.jpg")} style={{width: '90%', height: 200, alignSelf: 'center'}}></Image>
                                    </View>
                                </View>
                            </Callout>
                        </MapView.Marker>

                        <MapView.Marker
                            coordinate={{
                                latitude: 65.022615,
                                longitude: 25.481453,
                            }}
                            title={'Default marker 3'}>
                            <Callout onPress={() => {
                                console.log('clicked marker view');
                                navigation.navigate('EventScreen', {
                                    data: item
                                });
                            }}>
                                <View>
                                    <View style={{width: 200, height: 200, padding: 10}}>
                                        <Text>Test marker text. Lorem ipsum...</Text>
                                        <Image
                                            source={require("../assets/placeholderMap.jpg")}
                                            resizeMode='center'
                                            style={{width: '100%'}}
                                        ></Image>
                                    </View>
                                </View>
                            </Callout>

                        </MapView.Marker>

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