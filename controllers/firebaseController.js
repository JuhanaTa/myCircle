import { db } from '../configs/firebaseConfig';
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import {
  avatarDefaults,
  defaultAvatarUri
} from '../components/profile/avatarConfig';

//Add your firebase functions/calls here

//create user to database
export const createUser = async (name, email, fullname, id) => {
  try {
    await db
      .collection('Users')
      .doc(id)
      .set({
        name: name,
        email: email,
        fullname: fullname,
        userId: id,
        reportObject: [],
        interests: [],
        pets: [],
        transportType: [],
        employmentStatus: '',
        housingType: '',
        userAvatar: { uri: defaultAvatarUri, options: avatarDefaults },
        gamePoints: 1
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
    reports.forEach((element) => {
      fetchedReports.push(element.data());
    });

    return fetchedReports;
  } catch (e) {
    console.log(e);
  }
};

// modify user
// pass the user fields to be updated as an object parameter to updateUser()
export const updateUser = async (userObject) => {
  try {
    const id = await firebase.auth().currentUser.uid;

    await db.collection('Users').doc(id).update(userObject);

    // refetch user for redux store update
    const updatedData = await getUser(id);

    return updatedData;
  } catch (e) {
    console.log(e);
  }
};

export const registerWithEmailAndPassword = async (email, password) => {
  const response = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);

  //console.log('auth response', response);

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
  await firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('user signed out');
    });
};

export const createReport = async (description, image, location, topic, id, reportId, time) => {
  try {
    const reportObject = {
      description,
      image,
      location,
      topic,
      key: reportId, // to be used as React key prop
      userId: id,
      time
    };
    // newly created report object is not contained in the firebase response
    await db.collection('Reports').doc(reportId).set(reportObject);

    const user = await getUser(id);

    const reportArray = [];

    for (let i = 0; i < user.reportObject.length; i++) {
      reportArray.push(user.reportObject[i]);
    }

    //new report to object

    reportArray.push(reportObject);

    await db.collection('Users').doc(id).update({
      reportObject: reportArray
    });

    console.log('created Report');
    // all reports all refetched to include the newly created report
    // the returned value will be used to update redux store;
    return await getReports();
  } catch (e) {
    console.log(e);
  }
};

export const deleteReport = async (id, userId) => {
  try {
    //from reports
    await db.collection('Reports').doc(id).delete();

    //from users
    const user = await getUser(userId);


    const reportArray = [];

    for (let i = 0; i < user.reportObject.length; i++) {
      if(user.reportObject[i].key !== id){
        reportArray.push(user.reportObject[i]);
      } else {
        console.log('detected deleted report from user');
      }
    }

    await db.collection('Users').doc(userId).update({
      reportObject: reportArray
    });
    console.log('report deleted and user array', reportArray);

    //reports fetched after deletion
    return await getReports();
  }catch(e){
    console.log(e);
  }
};

// image upload to firbase storage
export const uploadImageToFirebaseStorage = async (uri) => {
  // XMLHttpRequest used instead of fetch because fetch
  // is not supported natively on JSC; check the link below:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662

  const imageBlob = await new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.onload = () => resolve(req.response);
    req.onerror = (e) => {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    req.responseType = 'blob';
    req.open('GET', uri, true);
    req.send(null);
  });
  // reference to the root of storage
  const ref = firebase.storage().ref();
  // reference to image file in cloud storage: root/images/file.jpg
  const imageRef = await ref.child(`images/${uuidv4()}`);

  const uploadResponse = await imageRef.put(imageBlob);

  // close the blob
  imageBlob.close();

  const imgUrl = await uploadResponse.ref.getDownloadURL();
  return imgUrl;
};
