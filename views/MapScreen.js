import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import MapView, {Callout} from 'react-native-maps';
import * as Location from 'expo-location';
import AppLoading from 'expo-app-loading';
import {calculateDistance} from '../utils/DistanceCalculator';
import {IconButton} from 'react-native-paper';
import ModalDialog from '../components/globalReUseAbles/ModalDialog';
import ReportTopics from '../components/reports/ReportTopics';
import {useSelector} from 'react-redux';

export default function MapScreen({navigation, route}) {

    let locFromItem;
    
    if(route.params != undefined){
        const {oneItemLocation} = route.params;
        locFromItem = oneItemLocation;
    }
    
    //all nearby reports
    const [filteredReports, setFilteredReports] = useState([]);

    const [currentLoc, setCurrentLoc] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFilterDialogOpen, setFilterDialogOpen] = useState(false);
    const [checkedTopic, setCheckedTopic] = useState("");

    const openFilterMenu = () => setFilterDialogOpen(true);

    const closeFilterMenu = () => {
        setFilterDialogOpen(false);
        //deleteFilters();
    };

    const reports = useSelector((store) => store.reports);

    console.log('checked topic', checkedTopic);

    const handleChecked = (topic) => {
        setCheckedTopic(topic);
        applyFilterToReports(topic);
    };



    const getLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            //navigation.popToTop();
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log(location);

        return location;
    };

    const deleteFilters = async () => {

        const loopedReports = [];
        const location = await getLocation();

        reports.forEach(element => {

            if (element.location != '') {
                if (calculateDistance(element.location.latitude, element.location.longitude, location.coords.latitude, location.coords.longitude) <= 10) {
                    loopedReports.push(element);
                } else {
                    console.log('too far');
                }
            }


        });

        setFilteredReports(loopedReports);
        setCheckedTopic('');
        setCurrentLoc(location);
    };

    const getMapMarkers = async () => {

        const loopedReports = [];

        const location = await getLocation();

        reports.forEach(element => {

            if (element.location != '') {
                if (calculateDistance(element.location.latitude, element.location.longitude, location.coords.latitude, location.coords.longitude) <= 10) {

                    if (checkedTopic.length != 0) {
                        if (element.topic == checkedTopic) {
                            loopedReports.push(element);
                        } else {
                            console.log('wrong topic');
                        }
                    } else {
                        loopedReports.push(element);
                    }

                } else {
                    console.log('too far');
                }

            }

        });

        setFilteredReports(loopedReports);
        setCurrentLoc(location);
        setLoading(false);

    };

    const applyFilterToReports = async (topic) => {

        const loopedReports = [];

        const location = await getLocation();

        reports.forEach(element => {

            if (element.location != '') {
                if (calculateDistance(element.location.latitude, element.location.longitude, location.coords.latitude, location.coords.longitude) <= 10) {
                    if (element.topic == topic) {
                        loopedReports.push(element);
                    } else {
                        console.log('wrong topic');
                    }
                } else {
                    console.log('too far');
                }
            }

        });

        setFilteredReports(loopedReports);
        setCurrentLoc(location);
    };


    console.log('reports', filteredReports[0]);

    useEffect(() => {
        (async () => {
            getMapMarkers();
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
                                latitude: locFromItem ? locFromItem.latitude : currentLoc.coords.latitude,
                                longitude: locFromItem ? locFromItem.longitude : currentLoc.coords.longitude,
                                latitudeDelta: locFromItem ? 0.03 : 0.05,
                                longitudeDelta: locFromItem ? 0.03 : 0.05
                            }}
                        >

                            {/*<MapView.Heatmap
                    points={points}
                    opacity={1}
                    radius={50}
                    maxIntensity={100}
                    gradientSmoothing={10}
                    heatmapMode={"POINTS_DENSITY"} /> 
                    
                    
                    <Text style={{alignSelf: 'center'}}> <Image style={{ height: 100, width: 100 }} source={{ uri: marker.image }} resizeMode='contain' /> </Text>*/
                            }

                            <MapView.Circle
                                center={{
                                    latitude: currentLoc.coords.latitude,
                                    longitude: currentLoc.coords.longitude,
                                }}
                                radius={10000}
                                strokeWidth={1}
                                strokeColor={'#1a66ff'}
                                fillColor={'rgba(230,238,255,0.5)'}
                            />
                            {filteredReports.map(marker => (

                                <MapView.Marker
                                    key={marker.location.description}
                                    coordinate={marker.location}
                                    title={marker.description}
                                >
                                    <Callout tooltip onPress={() => {
                                        console.log('clicked marker view', marker);
                                        navigation.push('EventScreen', {
                                            data: marker
                                        });


                                    }}>
                                        <View style={{width: 200, height: 200, padding: 10, borderRadius: 20, backgroundColor: 'white'}}>
                                            <Text>Topic: {marker.topic}</Text>
                                            <Text>Description: {marker.description}</Text>
                                        </View>
                                    </Callout>
                                </MapView.Marker>
                            ))}

                        </MapView>

                        <View
                            style={{
                                position: 'absolute',//use absolute position to show button on top of the map
                                top: '1%', //for center align
                                right: '83%',
                                alignSelf: 'flex-end', //for align to right
                                backgroundColor: 'white',
                                borderRadius: 30,

                            }}
                        >
                            {checkedTopic.length == 0 ? (
                                <IconButton title='asd'
                                    icon="filter-outline"
                                    color={'#007bff'}
                                    style={{backgroundColor: 'white'}}
                                    size={30}
                                    onPress={() => openFilterMenu()}
                                >
                                </IconButton>

                            ) : (
                                <View style>
                                    <IconButton title='asd'
                                        icon="filter-outline"
                                        color={'#007bff'}
                                        style={{backgroundColor: 'white', borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}
                                        size={30}
                                        onPress={() => openFilterMenu()}
                                    >
                                    </IconButton>
                                    <IconButton title='asd'
                                        icon="close"
                                        color={'#007bff'}
                                        style={{backgroundColor: 'white', borderTopLeftRadius: 0, borderTopRightRadius: 0}}
                                        size={30}
                                        onPress={async () => {await deleteFilters();}}
                                    >
                                    </IconButton>
                                </View>
                            )}

                        </View>

                    </>
                }
                <ModalDialog
                    open={isFilterDialogOpen}
                    closeDialog={closeFilterMenu}
                    theme={{colors: {primary: '#112454'}}}
                    label="Apply"
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