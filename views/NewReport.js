import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import ImagePicker from '../components/reports/ImagePicker';
import PreviewReport from '../components/reports/PreviewReport';
import ReportTopics from '../components/reports/ReportTopics';
import AppLoading from 'expo-app-loading';
import useCamera from '../hooks/useCamera';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black
} from '@expo-google-fonts/inter';

const NewReport = ({ navigation }) => {
  const { image, video, getImage, launchCamera, setImage } = useCamera({});
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
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.mainHeader}>Add a new report</Text>
          <Text style={styles.subHeader}> Choose report topic</Text>
        </View>
        <View>
          <ReportTopics checked={checkedTopic} setChecked={handleChecked} />
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
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  header: {
    width: '100%',
    paddingLeft: '3%',
    paddingTop: '10%'
  },
  mainHeader: {
    color: '#112454',
    paddingLeft: '3%',
    paddingTop: '5%',
    paddingBottom: '4%',
    fontSize: 39,
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    fontFamily: 'Inter_700Bold'
  },
  subHeader: {
    paddingLeft: '4%',
    paddingBottom: '2%',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#566787'
  },
  description: {
    width: 240,
    maxHeight: 200,
    marginTop: 8
  }
});

export default NewReport;
