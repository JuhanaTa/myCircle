import React, { useState } from 'react';
import ModalDialog from '../globalReUseAbles/ModalDialog';

const UserInterestsQuestionnaire = ({
  isQuestionnaireOpened,
  closeFirstQuestionnaireDialog
}) => {
  const [isHobbiesOpened, setHobbies] = useState(false);
  const [isPreferencesOpened, setPreferences] = useState(false);

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

  const handleQuestionnaireSubmission = () => {
    setPreferences(false);
  };

  const Interests = () => {
    return (
      <ModalDialog
        open={isQuestionnaireOpened}
        closeDialog={closeFirstQuestionnaireDialog}
        action={goToHobbiesDialog}
        theme={{ colors: { primary: '#112454' } }}
        label="Next"
        title="What are your Interests? Select All that applies"
      ></ModalDialog>
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
      ></ModalDialog>
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
      ></ModalDialog>
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
