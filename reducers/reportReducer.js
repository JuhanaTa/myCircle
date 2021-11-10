import firebase from "firebase";
import {createReport, getReports, uploadImageToFirebaseStorage} from "../controllers/firebaseController";

const reportReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_REPORTS':
      return action.reports;
    case 'NEW_REPORT':
      return state;
    default:
      return state;
  }
};

const setFetchedReports = () => {
  return async (dispatch) => {
    const reports = await getReports();
    dispatch({
      type: 'SET_REPORTS',
      reports
    });
  };
};

const createNewReport = (imageUri, location, description, reportTopic) => {
  return async (dispatch) => {
    try {

      const image = await uploadImageToFirebaseStorage(imageUri);
      const newReport = await createReport(
      description,
      image,
      {latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0, longitudeDelta: 0,},
      reportTopic,
      firebase.auth().currentUser.uid
      );
      console.log('new report', newReport);
      
      dispatch({
        type: 'NEW_BLOG',
        newReport
      });
    } catch (error) {
      console.log('new report error', error);
      
    }
  };
};

export {reportReducer as default, createNewReport, setFetchedReports};