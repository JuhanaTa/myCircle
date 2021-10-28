import { db } from '../configs/firebaseConfig'; 
import firebase from 'firebase';
//Add your firebase functions/calls here


//create user to database
export const createUser = async (name, email, id) => {

    try {
        await db.collection('users')
        .doc(id)
        .set({
            name: name,
            email: email,
            userId: id
        });

        console.log('user added');

    } catch (e) {
        console.log(e);
    }
};

//modify user
export const updateUser = async (name, email, id) => {

    try {
        await db.collection('users')
        .doc(id)
        .update({
            name: name,
            email: email,
            userId: id
        });

        console.log('user modified');

    } catch (e) {
        console.log(e);
    }
};

export const registerWithEmailAndPassword = async (email, password) => {
    const response = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);

    console.log('auth response',response);

    return response;
};

export const loginWithUserAndPassword = async (email, password) => {
    const response = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);

    console.log('auth response',response);

    return response;
};

export const logOut = async () => {

    await firebase.auth()
    .signOut()
    .then(() => {console.log('user signed out');});

};