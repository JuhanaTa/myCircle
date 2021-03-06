import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { modifyCurrentUser } from '../../reducers/currentUserReducer';
import ModalDialog from '../globalReUseAbles/ModalDialog';
import Radiobutton from '../RadioButton/RadioButton';
import {
  EMPLOYMENT,
  HOUSING,
  INTERESTS,
  PETS,
  TRANSPORTATION
} from './questionnaireConstants';

const UserInterestsQuestionnaire = ({
  isQuestionnaireOpened,
  closeFirstQuestionnaireDialog,
  openQuestionnaire,
  handleTabPress
}) => {
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state);
  const [isSnackbarOpened, setSnackbar] = useState(false);
  const [isPetsDialogOpened, setPetsDialog] = useState(false);
  const [isTransportationDialogOpened, setTransportationDialog] =
    useState(false);
  const [isHousingDialogOpened, setHousingDialog] = useState(false);
  const [isEmploymentDialogOpened, setEmploymentDialog] = useState(false);
  const [interests, setCheckedInterests] = useState([]);
  const [pets, setCheckedPets] = useState([]);
  const [transportType, setCheckedTransportType] = useState([]);
  const [housingType, setCheckedHousingType] = useState('');
  const [employmentStatus, setCheckedEmploymentStatus] = useState('');

  const goToEmploymentDialog = () => {
    closeFirstQuestionnaireDialog();
    setEmploymentDialog(true);
  };

  const goToPetsDialog = () => {
    setEmploymentDialog(false);
    setPetsDialog(true);
  };

  const goToTransportationDialog = () => {
    setPetsDialog(false);
    setTransportationDialog(true);
  };

  const goToHousingDialog = () => {
    setTransportationDialog(false);
    setHousingDialog(true);
  };
  const restartQuestionaire = () => {
    setEmploymentDialog(false);
    openQuestionnaire();
  };

  const backToEmploymentDialog = () => {
    setPetsDialog(false);
    setEmploymentDialog(true);
  };

  const backToPetsDialog = () => {
    setTransportationDialog(false);
    setPetsDialog(true);
  };

  const backToTransportationDialog = () => {
    setHousingDialog(false);
    setTransportationDialog(true);
  };

  const handleQuestionnaireSubmission = async () => {
    setHousingDialog(false);
    if (
      interests.length === 0 &&
      pets.length === 0 &&
      transportType.length === 0 &&
      !housingType &&
      !employmentStatus
    )
      return setSnackbar(true);

    // updates user's interests in the db and the app's redux store
    dispatch(
      modifyCurrentUser({
        interests: interests.length !== 0 ? interests: [...currentUser?.interests] ,
        pets: pets.length !== 0 ? pets : [...currentUser?.pets],
        transportType: transportType.length !== 0 ? transportType : [...currentUser?.transportType],
        housingType: housingType ? housingType : currentUser?.housingType,
        employmentStatus: employmentStatus ? employmentStatus :currentUser?.employmentStatus
      })
    );
    // opens the section that is updated
    if(!interests.length) handleTabPress('personalData');
    setCheckedInterests([]);
    setCheckedPets([]);
    setCheckedTransportType([]);
    setCheckedHousingType(''),
    setCheckedEmploymentStatus('');
  };

  const onCheckBoxPress = (checkedItem, checkedState, setState, type) => {
    if (type) return setState(checkedItem);
    checkedState.includes(checkedItem)
      ? setState(checkedState.filter((item) => item !== checkedItem))
      : setState([...checkedState, checkedItem]);
  };

  const questionnaireList = (questions, checkedState, setState, type) =>
    questions.map((item, index) => {
      return (
        <Radiobutton
          key={index}
          onRadioButtonPress={() =>
            onCheckBoxPress(item, checkedState, setState, type)
          }
          isChecked={checkedState.includes(item)}
          text={item}
        />
      );
    });

  const Interests = () => {
    return (
      <ModalDialog
        open={isQuestionnaireOpened}
        closeDialog={closeFirstQuestionnaireDialog}
        action={goToEmploymentDialog}
        theme={{ colors: { primary: '#112454' } }}
        label="Next"
        title="Tell us what you???re interested in!"
        progress={interests[0] ? 0.2 : 0}
      >
        <ScrollView style={styles.interestsContainer}>
          {questionnaireList(INTERESTS, interests, setCheckedInterests)}
        </ScrollView>
      </ModalDialog>
    );
  };

  const Employment = () => {
    return (
      <ModalDialog
        open={isEmploymentDialogOpened}
        closeDialog={() => setEmploymentDialog(false)}
        action={goToPetsDialog}
        secondaryAction={
          <Button icon="skip-previous" onPress={restartQuestionaire}></Button>
        }
        theme={{ colors: { primary: '#112454' } }}
        label="Next"
        title="Tell us a little bit about you!"
        subtitle="I am a..."
        progress={0.4}
      >
        {questionnaireList(
          EMPLOYMENT,
          employmentStatus,
          setCheckedEmploymentStatus,
          'employmentStatus'
        )}
      </ModalDialog>
    );
  };
  const Pets = () => {
    return (
      <ModalDialog
        open={isPetsDialogOpened}
        closeDialog={() => setPetsDialog(false)}
        action={goToTransportationDialog}
        secondaryAction={
          <Button
            icon="skip-previous"
            onPress={backToEmploymentDialog}
          ></Button>
        }
        theme={{ colors: { primary: '#112454' } }}
        label="Next"
        title="Tell us a little bit about you!"
        subtitle="Pets?"
        progress={0.6}
      >
        {questionnaireList(PETS, pets, setCheckedPets)}
      </ModalDialog>
    );
  };

  const TransportType = () => {
    return (
      <ModalDialog
        open={isTransportationDialogOpened}
        closeDialog={() => setTransportationDialog(false)}
        action={goToHousingDialog}
        secondaryAction={
          <Button icon="skip-previous" onPress={backToPetsDialog}></Button>
        }
        theme={{ colors: { primary: '#112454' } }}
        label="Next"
        title="Tell us a little bit about you!"
        subtitle="How do you get around?"
        progress={0.8}
      >
        {questionnaireList(
          TRANSPORTATION,
          transportType,
          setCheckedTransportType
        )}
      </ModalDialog>
    );
  };

  const HousingType = () => {
    return (
      <ModalDialog
        open={isHousingDialogOpened}
        closeDialog={() => setHousingDialog(false)}
        action={handleQuestionnaireSubmission}
        secondaryAction={
          <Button
            icon="skip-previous"
            onPress={backToTransportationDialog}
          ></Button>
        }
        theme={{ colors: { primary: '#112454' } }}
        label="Submit"
        title="Tell us a little bit about you!"
        subtitle="Housing Type?"
        progress={1}
      >
        {questionnaireList(
          HOUSING,
          housingType,
          setCheckedHousingType,
          'housingType'
        )}
      </ModalDialog>
    );
  };

  return (
    <>
      <Interests />
      <Employment />
      <Pets />
      <TransportType />
      <HousingType />
      <Snackbar
        style={[styles.Snackbar, { backgroundColor: '#112454' }]}
        visible={isSnackbarOpened}
        onDismiss={() => setSnackbar(false)}
        duration={3000}
      >
        Nothing to save, no modifications made!
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  interestsContainer: {
    height: 300
  },
  Snackbar: {
    justifyContent: 'center',
    padding: 2
  }
});

export default UserInterestsQuestionnaire;
