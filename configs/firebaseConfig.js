import firebase from 'firebase';
import { LogBox } from 'react-native';

// Initialize Firebase
export const firebaseConfig = {
    apiKey: "AIzaSyCNOev2obt2QMpPJjRPinYuEjR51cH__kk",
    authDomain: "mycircle-ca851.firebaseapp.com",
    projectId: "mycircle-ca851",
    storageBucket: "mycircle-ca851.appspot.com",
    messagingSenderId: "263689513116",
    appId: "1:263689513116:web:ca1d98e914673963ece559",
    measurementId: "G-L5WT37R3HQ"
  };
  

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
} else {
    //if already initialized
    firebase.app();
}

// disable warings resulting from Firebase long period timers settings in Android
LogBox.ignoreLogs([`Setting a timer for a long period`]);

export const db = firebase.firestore();
console.log('config done');
