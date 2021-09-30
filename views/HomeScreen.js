
import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';


export default function HomeScreen({navigation}) {
    return (
        <View>
            <Text>HomeScreen</Text>

            <Button title='profile' onPress={() => {
                navigation.navigate('Profile')
                console.log('pressed')
            }}>profile</Button>
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
});
