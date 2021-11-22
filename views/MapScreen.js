import React, {useEffect, useState} from 'react';
import {Button, Dimensions, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import MapView, {Callout} from 'react-native-maps';
import * as Location from 'expo-location';
import {getReports} from '../controllers/firebaseController';
import AppLoading from 'expo-app-loading';
import {calculateDistance} from '../utils/DistanceCalculator';
import {Divider, IconButton, Menu, TextInput} from 'react-native-paper';
import ModalDialog from '../components/globalReUseAbles/ModalDialog';
import ReportTopics from '../components/reports/ReportTopics';

export default function MapScreen({navigation}) {


    const [coordinates, setCoordinates] = useState([]);
    const [currentLoc, setCurrentLoc] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFilterDialogOpen, setFilterDialogOpen] = useState(false);
    const [checkedTopic, setCheckedTopic] = useState();
    const [open, setDialog] = useState(false);

    const closeDialog = () => setDialog(false);
    const openFilterMenu = () => setFilterDialogOpen(true);
    const closeFilterMenu = () => setFilterDialogOpen(false);

    console.log('checked topic', checkedTopic);

    const handleMenuItemEditProfilePress = () => {
        closeFilterMenu();
        openFilterMenu();
    };

    const handleFilerUpdate = () => {
        closeFilterMenu();
    };

    const handleChecked = (topic) => {
        setCheckedTopic(topic);
        closeDialog();
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
                    <>

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
                        <View
                            style={{
                                position: 'absolute',//use absolute position to show button on top of the map
                                top: '0%', //for center align
                                right: '82%',
                                alignSelf: 'flex-end' //for align to right
                            }}
                        >
                            <IconButton title='asd'
                                icon="filter-outline"
                                color={'#007bff'}
                                style={{backgroundColor: 'white'}}
                                size={35}
                                onPress={() => openFilterMenu()}
                            >
                            </IconButton>
                        </View>

                    </>
                }
                <ModalDialog
                    open={isFilterDialogOpen}
                    closeDialog={closeFilterMenu}
                    action={handleFilerUpdate}
                    theme={{colors: {primary: '#112454'}}}
                    label="Select"
                    title="Edit Filters"
                >
                    <ScrollView>
                        <View style={styles.container}>
                            <ReportTopics checked={checkedTopic} setChecked={handleChecked} />
                        </View>
                    </ScrollView>
                </ModalDialog>
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
        height: Dimensions.get('window').height - (Dimensions.get('screen').height - Dimensions.get('window').height + StatusBar.currentHeight),
    },
    textInput: {
        fontFamily: 'Inter_400Regular',

        borderRadius: 44 / 2,
        height: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        margin: 12,
        padding: 10,
        backgroundColor: '#fff'
    }
});