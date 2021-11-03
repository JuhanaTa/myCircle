import {db} from '../configs/firebaseConfig';
import firebase from 'firebase';
//Add your firebase functions/calls here


//create user to database
export const createUser = async (name, email, id) => {

    try {
        await db.collection('Users')
            .doc(id)
            .set({
                name: name,
                email: email,
                userId: id,
                reportObject: []
            });

        console.log('user added');

    } catch (e) {
        console.log(e);
    }
};

export const getUser = async (id) => {

    try {
        const user = await db.collection('Users').doc(id).get();
        return user.data();
    } catch (e) {
        console.log(e);
    }
};

export const getReports = async () => {

    try {
        const fetchedReports = [];
        const reports = await db.collection('Reports').get();
        reports.forEach(element => {
            fetchedReports.push(element.data());
        });

        console.log('asdsa',fetchedReports);
        return fetchedReports;
    } catch (e) {
        console.log(e);
    }
};


//modify user
export const updateUser = async (name, email, id) => {

    try {
        await db.collection('Users')
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

    console.log('auth response', response);

    return response;
};

export const loginWithUserAndPassword = async (email, password) => {
    const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

    console.log('auth response', response);

    return response;
};

export const logOut = async () => {

    await firebase.auth()
        .signOut()
        .then(() => {console.log('user signed out');});

};

export const createReport = async (description, image, location, topic, id) => {
    try {

        const reportObject = {description: description, image: image, location: location, topic: topic, userId: id};
        let response;

        response = await db.collection('Reports').add(reportObject);

        const user = await getUser(id);

        console.log('user obejct',user.reportObject);

        const reportArray = [];

        for (let i = 0; i < user.reportObject.length; i++) {
            reportArray.push(user.reportObject[i]);

            
        }

        //new report to object

        reportArray.push(reportObject);

        await db.collection('Users')
            .doc(id)
            .update({
                reportObject: reportArray
            });

        /*
        switch (topic) {
            case 1:
                response = await db.collection('Maintenance').add(reportObject);
                reportObject.topic = 'Maintenance';
                break;
            case 2:
                response = await db.collection('Event').add(reportObject);
                reportObject.topic = 'Event';
                break;
            case 3:
                response = await db.collection('Reports').add(reportObject);
                reportObject.topic = 'Reports';
                break;
            case 4:
                response = await db.collection('Topic4').add(reportObject);
                reportObject.topic = 'Topic4';
                break;
            case 5:
                response = await db.collection('Topic5').add(reportObject);
                reportObject.topic = 'Topic5';
                break;
            case 6:
                response = await db.collection('Topic6').add(reportObject);
                reportObject.topic = 'Topic6';
                break;
            case 7:
                response = await db.collection('Topic7').add(reportObject);
                reportObject.topic = 'Topic7';
                break;
            default:
            // code block
        }*/

        console.log('created Report');

        return response;

    } catch (e) {
        console.log(e);
    }
};