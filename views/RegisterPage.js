import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  LogBox,
  Text,
  Alert
} from 'react-native';
import {Button} from 'react-native-paper';
import {useEffect} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
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

export default function RegisterPage({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullName] = useState('');
  const [error, setError] = useState('');

  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

  const handleRegister = async () => {
    try {
      if (username.length > 0) {
        if (emailRegex.test(email)) {
          if (password.length >= 6) {
            if(fullname.length > 0){
              const result = await registerWithEmailAndPassword(email, password);
              console.log('result', result);
  
              //creating User in Firebase
  
              await createUser(username, email, fullname, result.user.uid);
              console.log('user created');
            }else{
              setError('Fullname must be at least 1 character long');
            }

          } else {
            setError('Password must be 6 characters long');
          }
        } else {
          setError('Email not valid');
        }
      } else {
        setError('Username must be at least 1 character long');
      }
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
  };

  LogBox.ignoreLogs(['Setting a timer']); // ignore specific logs
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <LinearGradient colors={['#00c6ff', '#0072ff']} style={styles.background}>
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
              theme={{colors: {primary: '#007bff'}}}
              onPress={() => {
                handleRegister();
              }}
            >
              Register
            </Button>
            {error.length > 0 &&
              <Text style={{color: 'red', marginTop: 5}}>{error}</Text>
            }
            <Text
              style={styles.link}
              onPress={() => {
                navigation.popToTop();
              }}
            >
              Already have account?
            </Text>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  backgroundCircle: {},
  container: {
    position: 'relative',
    marginTop: 50,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  svg: {
    position: 'absolute'
  },

  image: {
    marginTop: '5%',
    width: '50%'
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
    color: '#fff'
  },
  link: {
    width: '100%',
    paddingBottom: '2%',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10
  },
  input: {
    fontFamily: 'Inter_400Regular',
    width: '100%',
    borderRadius: 44 / 2,
    height: 45,
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
    width: '100%',
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
