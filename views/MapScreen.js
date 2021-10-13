import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import MapView, {Callout} from 'react-native-maps';

export default function MapScreen({navigation}) {

    let Image_Http_URL = {uri: 'http://placekitten.com/200/300'};
    let points = [
        {latitude: 65.012615, longitude: 25.461453, weight: 1},
        {latitude: 65.002615, longitude: 25.451453, weight: 1},
        {latitude: 65.022615, longitude: 25.441453, weight: 1}
    ];

    const item = {
        title: 'Test'
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 65.012615,
                    longitude: 25.471453,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} >

                <MapView.Heatmap
                    points={points}
                    opacity={1}
                    radius={50}
                    maxIntensity={100}
                    gradientSmoothing={10}
                    heatmapMode={"POINTS_DENSITY"} />

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

                <MapView.Marker
                    coordinate={{
                        latitude: 65.012615,
                        longitude: 25.471453,
                    }}
                    title={'Default marker'}
                >
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
                                <Image source={require("../assets/placeholderMap.jpg")} style={{width: '90%', height: 200 , alignSelf: 'center'}}></Image>
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
        </View>
    );
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
        height: Dimensions.get('window').height,
    },
});