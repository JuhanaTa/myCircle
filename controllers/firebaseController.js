import { db } from '../configs/firebaseConfig'; 

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