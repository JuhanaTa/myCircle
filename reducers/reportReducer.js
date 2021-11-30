import firebase from 'firebase';
import {
  createReport,
  getReports,
  uploadImageToFirebaseStorage,
  deleteReport
} from '../controllers/firebaseController';
import { modifyCurrentUser } from './currentUserReducer';
import { setSnackbar, setTickAnimation } from './toggleReducers';
import { v4 as uuidv4 } from 'uuid';

const reportReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_REPORTS':
      return action.reports || state;
    case 'NEW_REPORT_ADDED':
      return action.newReportAdded;
    case 'DELETE_REPORT':
      return action.reportDeleted;
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

const createNewReport = (
  imageUri,
  location,
  description,
  reportTopic,
  userGamepoints,
  time
) => {
  return async (dispatch) => {
    try {
      const points = userGamepoints || 0;
      const id = await firebase.auth().currentUser.uid;
      const image = imageUri
        ? await uploadImageToFirebaseStorage(imageUri)
        : '';
      const reportId = `${uuidv4()}`;
      const newReportAdded = await createReport(
        description,
        image,
        location,
        reportTopic,
        id,
        reportId,
        time
      );
      dispatch(setTickAnimation());
      dispatch({
        type: 'NEW_REPORT_ADDED',
        newReportAdded
      });
      dispatch(
        modifyCurrentUser({
          gamePoints: imageUri ? points + 5 : points + 3
        })
      );
    } catch (error) {
      console.log('new report error', error);
    }
  };
};

const deleteOneReport = (
  id
) => {
  return async (dispatch) => {
    try {
      const userId = await firebase.auth().currentUser.uid;
      const reportDeleted = await deleteReport(id, userId);
      dispatch({
        type: 'DELETE_REPORT',
        reportDeleted
      });
    } catch(e) {
      console.log('report deletion error');
    }
  };
};

export { reportReducer as default, createNewReport, setFetchedReports, deleteOneReport };
