import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { modifyCurrentUser } from '../../reducers/currentUserReducer';
import ModalDialog from '../globalReUseAbles/ModalDialog';
import Radiobutton from '../RadioButton/RadioButton';
import { HOBBIES, INTERESTS, PREFERENCES } from './questionnaireConstants';

const UserInterestsQuestionnaire = ({
  isQuestionnaireOpened,
  closeFirstQuestionnaireDialog
}) => {
  const dispatch = useDispatch();
  const [isHobbiesOpened, setHobbies] = useState(false);
  const [isPreferencesOpened, setPreferences] = useState(false);
  const [interests, setCheckedInterests] = useState([]);
  const [hobbies, setCheckedHobbies] = useState([]);
  const [preferences, setCheckedPreferences] = useState([]);

  const closeHobiesDialog = () => setHobbies(false);
  const closePreferences = () => setPreferences(false);

  const goToHobbiesDialog = () => {
    closeFirstQuestionnaireDialog();
    setHobbies(true);
  };

  const goToPreferencesDialog = () => {
    closeHobiesDialog();
    setPreferences(true);
  };

  const handleQuestionnaireSubmission = async () => {
    setPreferences(false);
    // updates user's interests in the db and the app's redux store
    dispatch(
      modifyCurrentUser({ userInterests: { interests, hobbies, preferences } })
    );
  };

  const onCheckBoxPress = (checkedItem, checkedState, setState) => {
    checkedState.includes(checkedItem)
      ? setState(checkedState.filter((item) => item !== checkedItem))
      : setState([...checkedState, checkedItem]);
  };

  const questionnaireList = (questions, checkedState, setState) =>
    questions.map((item, index) => {
      return (
        <Radiobutton
          key={index}
          onRadioButtonPress={() =>
            onCheckBoxPress(item, checkedState, setState)
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
        action={goToHobbiesDialog}
        theme={{ colors: { primary: '#112454' } }}
        label="Next"
        title="What are your Interests? Select All that applies"
      >
        {questionnaireList(INTERESTS, interests, setCheckedInterests)}
      </ModalDialog>
    );
  };
  const Hobbies = () => {
    return (
      <ModalDialog
        open={isHobbiesOpened}
        closeDialog={closeHobiesDialog}
        action={goToPreferencesDialog}
        theme={{ colors: { primary: '#112454' } }}
        label="Next"
        title="What do you do for Fun? Select all that applies"
      >
        {questionnaireList(HOBBIES, hobbies, setCheckedHobbies)}
      </ModalDialog>
    );
  };

  const Preferences = () => {
    return (
      <ModalDialog
        open={isPreferencesOpened}
        closeDialog={closePreferences}
        action={handleQuestionnaireSubmission}
        theme={{ colors: { primary: '#112454' } }}
        label="Submit"
        title="Your Preferences! Select all that applies"
      >
        {questionnaireList(PREFERENCES, preferences, setCheckedPreferences)}
      </ModalDialog>
    );
  };

  return (
    <>
      <Interests />
      <Hobbies />
      <Preferences />
    </>
  );
};

export default UserInterestsQuestionnaire;
