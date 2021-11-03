import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import EventListItem from '../components/EventListItem';
import {LinearGradient} from 'expo-linear-gradient';
import {getReports} from '../controllers/firebaseController';
import EventList from '../components/EventList';

export default function EventListScreen({navigation}) {

    const [reportsData, setReportsData] = useState();

    const fetchReports = async () => {
        const reports = await getReports();
        setReportsData(reports);
    };

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

    useEffect(() => {
        fetchReports();
    }, []);


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
