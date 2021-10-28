import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Button, LogBox, Text, TouchableOpacity, Alert} from 'react-native';
import {useEffect} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {loginWithUserAndPassword} from '../controllers/firebaseController';

export default function LoginPage({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log(email, password);

    useEffect(() => {
        //createUser('Test', 'Test@Test.com', 123456789);
    }, []);

    const handleLogin = async () => {
        try {

            if(password.length >= 6) {
                const result = await loginWithUserAndPassword(email, password);
                console.log('result', result);
            } else {
                Alert.alert(
                    "Check Password",
                    "Password too short",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                  );
            }

        } catch (e) {console.log(e);}
        
    };

    LogBox.ignoreLogs(['Setting a timer']); // ignore specific logs
    return (
        <LinearGradient colors={['#eef4fb', '#dbe9f7']} style={styles.background}>
            <View style={styles.container}>

                <Text>Login</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    placeholder="Email"
                />

                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry={true}
                />

                <Button onPress={() => {
                    handleLogin();

                }} title="Login" />

                <TouchableOpacity style={{margin: 10}} onPress={
                    () => {navigation.navigate('RegisterPage');}
                }>
                    <Text style={{color: 'blue'}}>No account yet?</Text>
                </TouchableOpacity>


            </View>

        </LinearGradient>
    );

}

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
    },

});
