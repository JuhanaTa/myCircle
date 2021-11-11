import { db } from '../configs/firebaseConfig';
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';

//Add your firebase functions/calls here

//create user to database
export const createUser = async (name, email, id) => {
  try {
    await db
      .collection('Users')
      .doc(id)
      .set({
        name: name,
        email: email,
        userId: id,
        reportObject: [],
        userInterests: {
          interests: [],
          hobbies: [],
          preferences: []
        }
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

    console.log('asdsa', fetchedReports);
    return fetchedReports;
  } catch (e) {
    console.log(e);
  }
};

//modify user
export const updateUser = async (name, email, id) => {
  try {
    await db.collection('Users').doc(id).update({
      name: name,
      email: email,
      userId: id
    });

    console.log('user modified');
  } catch (e) {
    console.log(e);
  }
};

export const updateUserInterests = async (userObject) => {
  try {
    const id = await firebase.auth().currentUser.uid;

    const updatedData = await db.collection('Users').doc(id).update(userObject);

    console.log('userInterest updated');
    return updatedData;
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
  await firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('user signed out');
    });
};

export const createReport = async (description, image, location, topic, id) => {
  try {
    const reportObject = {
      description: description,
      image: image,
      location: location,
      topic: topic,
      userId: id
    };
    let response;

    response = await db.collection('Reports').add(reportObject);

    const user = await getUser(id);

    console.log('user obejct', user.reportObject);

    const reportArray = [];

    for (let i = 0; i < user.reportObject.length; i++) {
      reportArray.push(user.reportObject[i]);
    }

    //new report to object

    reportArray.push(reportObject);

    await db.collection('Users').doc(id).update({
      reportObject: reportArray
    });

    console.log('created Report', response);

    return response;
  } catch (e) {
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
  console.log('uploaded', imgUrl);

  return imgUrl;
};
