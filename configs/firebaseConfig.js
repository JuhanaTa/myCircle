import firebase from 'firebase';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

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

export const db = firebase.firestore();
console.log('config done');
