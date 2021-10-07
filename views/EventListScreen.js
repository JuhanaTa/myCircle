import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import EventListItem from '../components/EventListItem';
import { LinearGradient } from 'expo-linear-gradient';

export default function EventListScreen({navigation}) {

    //Fetch ListData here. Now uses Data array
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
    ];
    
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
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
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
