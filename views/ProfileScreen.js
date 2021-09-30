
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function ProfileScreen({navigation}) {
  return (
    <View>
        <Text>Profile</Text>
        <Button title='home' onPress={() => {navigation.popToTop() }}>Back to home</Button>
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
