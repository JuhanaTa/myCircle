import firebase from 'firebase';
import {
  createReport,
  getReports,
  uploadImageToFirebaseStorage
} from '../controllers/firebaseController';
import {setSnackbar, setTickAnimation} from './toggleReducers';

const reportReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_REPORTS':
      return action.reports || state;
    case 'NEW_REPORT_ADDED':
      return action.newReportAdded;
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
      const newReportAdded = await createReport(
        description,
        image,
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0
        },
        reportTopic,
        firebase.auth().currentUser.uid
      );

      dispatch({
        type: 'NEW_REPORT_ADDED',
        newReportAdded
      });
      dispatch(setTickAnimation());
    } catch (error) {
      console.log('new report error', error);
    }
  };
};

export { reportReducer as default, createNewReport, setFetchedReports };
