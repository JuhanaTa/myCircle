import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  LogBox,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Button } from 'react-native-paper';
import { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  registerWithEmailAndPassword,
  createUser
} from '../controllers/firebaseController';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black
} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import BackgroundImage from '../components/BackgorundCircle';

export default function RegisterPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullName] = useState('');

  console.log(username, password, fullname);
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  useEffect(() => {
    //createUser('Test', 'Test@Test.com', 123456789);
  }, []);

  const handleRegister = async () => {
    try {
      if (password.length >= 6) {
        const result = await registerWithEmailAndPassword(email, password);
        console.log('result', result);

        //creating User in Firebase

        await createUser(email, password, result.user.uid);
        console.log('user created');
      } else {
        Alert.alert('Check Password', 'Password too short', [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  LogBox.ignoreLogs(['Setting a timer']); // ignore specific logs
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <LinearGradient colors={['#eef4fb', '#dbe9f7']} style={styles.background}>
        <View style={styles.container}>
          <BackgroundImage></BackgroundImage>
          <Image
            style={styles.image}
            source={require('../assets/Logo.png')}
            resizeMode="contain"
          />
          <View style={styles.form}>
            <Text style={styles.subHeader}>Please register</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              placeholder="Username"
            />

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

            <TextInput
              style={styles.input}
              onChangeText={setFullName}
              placeholder="Fullname"
            />

            <Button
              accessibilityLabel="Register to MyCircle"
              style={styles.button}
              theme={{ colors: { primary: '#007bff' } }}
              onPress={() => {
                handleRegister();
              }}
            >
              Register
            </Button>
          </View>
          <TouchableOpacity
            style={{ margin: 30, flex: 1, justifyContent: 'flex-end' }}
            onPress={() => {
              navigation.popToTop();
            }}
          >
            <Text style={styles.link}>Already have account?</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  backgroundCircle: {},
  container: {
    position: 'relative',
    marginTop: 100,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  svg: {
    position: 'absolute'
  },

  image: {
    marginTop: 50,
    width: '60%'
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    width: '80%'
  },
  subHeader: {
    textAlign: 'left',
    width: '100%',
    paddingBottom: '2%',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#566787'
  },
  link: {
    textAlign: 'left',
    width: '100%',
    paddingBottom: '2%',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#007bff'
  },
  input: {
    fontFamily: 'Inter_400Regular',
    width: '100%',
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
  },
  button: {
    fontFamily: 'Inter_400Regular',
    marginTop: 5,
    marginLeft: 'auto',
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 44 / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  background: {
    position: 'absolute',
    zIndex: 0,
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  }
});
