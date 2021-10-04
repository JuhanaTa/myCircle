import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import ImagePicker from '../components/reports/ImagePicker';
import PreviewReport from '../components/reports/PreviewReport';
import ReportTopics from '../components/reports/ReportTopics';
import useCamera from '../hooks/useCamera';

const NewReport = ({ navigation }) => {
  const { image, video, getImage, launchCamera, setImage } = useCamera();
  const [description, setDescription] = useState('');
  const [open, setDialog] = useState(false);
  const [isPreviewOpened, setPreview] = useState(false);
  const [isSnackbarLanuched, setSnackbar] = useState(false);
  const [checkedTopic, setCheckedTopic] = useState();

  const openDialog = () => setDialog(true);
  const closeDialog = () => setDialog(false);

  const handleChecked = (topic) => {
    setCheckedTopic(topic);
    closeDialog();
  };
  const handlePreviewClosing = () => setPreview(false);
  const openPreview = () => setPreview(true);

  const closeSnackbar = () => setSnackbar(false);
  const handleReportSubmission = () => {
    setDescription('');
    setCheckedTopic('');
    setImage(null);
    setPreview(false);
    setSnackbar(true);
  };
  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        onPress={openDialog}
        accessibilityLabel="select a topic to report"
      >
        choose report topic
      </Button>
      <ReportTopics
        open={open}
        closeDialog={closeDialog}
        checked={checkedTopic}
        setChecked={handleChecked}
      />
      {checkedTopic ? <Text>{checkedTopic} </Text> : null}
      <View style={styles.description}>
        <TextInput
          placeholder="Description of the issue"
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          mode="outlined"
          label="description"
          numberOfLines={3}
        ></TextInput>
      </View>
      <ImagePicker
        image={image}
        video={video}
        getImage={getImage}
        launchCamera={launchCamera}
      />
      <Button
        mode="outlined"
        onPress={openPreview}
        accessibilityLabel="preview report and send"
      >
        submit
      </Button>
      <PreviewReport
        open={isPreviewOpened}
        closeDialog={handlePreviewClosing}
        action={handleReportSubmission}
        topic={checkedTopic}
        description={description}
        image={image}
      />
      <Snackbar visible={isSnackbarLanuched} onDismiss={closeSnackbar}>
        Report successfully submitted!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  description: {
    width: 240,
    maxHeight: 200,
    marginTop: 8
  }
});

export default NewReport;
