import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';

export default function MapScreen({navigation}) {

    let points = [
        {latitude: 65.012615, longitude: 25.461453, weight: 1},
        {latitude: 65.002615, longitude: 25.451453, weight: 1},
        {latitude: 65.022615, longitude: 25.441453, weight: 1}
    ];

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
                    radius={100}
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
                />

                <MapView.Marker
                    coordinate={{
                        latitude: 65.002615,
                        longitude: 25.461453,
                    }}
                    title={'Default marker 2'}
                />

                <MapView.Marker
                    coordinate={{
                        latitude: 65.022615,
                        longitude: 25.481453,
                    }}
                    title={'Default marker 3'}
                />
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