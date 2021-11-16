import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import EventListItem from '../components/EventListItem';
import {LinearGradient} from 'expo-linear-gradient';

export default function EventList({navigation, reportsData}) {
    console.log('reports data in event list',reportsData);
    //item that is rendered
    const renderItem = ({item}) => (
        <EventListItem item={item} navigation={navigation} />
    );

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#eef4fb', '#dbe9f7']}
                style={styles.background}
            />
                <FlatList
                    data={reportsData}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.description}-${item.image}`}
                />
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
