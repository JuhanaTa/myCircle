import React from 'react';
import { useSelector } from 'react-redux';
import {StyleSheet, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import EventList from '../components/EventList';

export default function EventListScreen({navigation}) {
    // returns reports from redux store
    const reportsData = useSelector(store => store.reports);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#eef4fb', '#dbe9f7']}
                style={styles.background}
            />
            {reportsData &&
                <EventList navigation={navigation} reportsData={reportsData}></EventList>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
    },
});
