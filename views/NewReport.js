import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';
import ImagePicker from '../components/reports/ImagePicker';
import PreviewReport from '../components/reports/PreviewReport';
import ReportTopics from '../components/reports/ReportTopics';
import AppLoading from 'expo-app-loading';
import useCamera from '../hooks/useCamera';
import {LinearGradient} from 'expo-linear-gradient';
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
import {
  createReport,
  uploadImageToFirebaseStorage
} from '../controllers/firebaseController';
import firebase from 'firebase';
import * as Location from 'expo-location';

const NewReport = ({navigation}) => {
  const {image, video, getImage, launchCamera, setImage} = useCamera({});
  const [description, setDescription] = useState('');
  const [open, setDialog] = useState(false);
  const [isPreviewOpened, setPreview] = useState(false);
  const [isSnackbarLanuched, setSnackbar] = useState(false);
  const [checkedTopic, setCheckedTopic] = useState();
  const [location, setLocatiom] = useState('');

  const openDialog = () => setDialog(true);
  const closeDialog = () => setDialog(false);

  const handleChecked = (topic) => {
    setCheckedTopic(topic);
    closeDialog();
  };
  const handlePreviewClosing = () => setPreview(false);
  const openPreview = () => setPreview(true);

  const closeSnackbar = () => setSnackbar(false);

  const handleReportSubmission = async () => {
    let location;
    let {status} = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    } else {
      location = await Location.getCurrentPositionAsync({});
      console.log(location);
    }

    const imageUrl = await uploadImageToFirebaseStorage(image.uri);
    const response = await createReport(
      description,
      imageUrl,
      {latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0, longitudeDelta: 0,},
      checkedTopic,
      firebase.auth().currentUser.uid
    );

    setDescription('');
    setCheckedTopic('');
    setImage(null);
    setPreview(false);
    setSnackbar(true);

    navigation.navigate('HomeStack', {screen: 'HomeStack'});
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
      <LinearGradient colors={['#eef4fb', '#dbe9f7']} style={styles.background}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.mainHeader}>Add a new report</Text>
              <Text style={styles.subHeader}> Choose report topic</Text>
            </View>
            <View style={styles.radioButtonGroup}>
              <ReportTopics checked={checkedTopic} setChecked={handleChecked} />
            </View>
            <View style={styles.description}>
              <Text style={styles.subHeader}> Add description to issue</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => setDescription(text)}
                placeholder="Description"
                value={description}
              />
            </View>
            <ImagePicker
              image={image}
              video={video}
              getImage={getImage}
              launchCamera={launchCamera}
            />
            <View style={styles.submitbuttonContainer}>
              <Button
                style={styles.submitbutton}
                theme={{colors: {primary: '#007bff'}}}
                onPress={openPreview}
                accessibilityLabel="preview report and send"
              >
                Submit
              </Button>
            </View>
            <PreviewReport
              open={isPreviewOpened}
              closeDialog={handlePreviewClosing}
              action={handleReportSubmission}
              topic={checkedTopic}
              description={description}
              image={image}
            />
            <Snackbar
              visible={isSnackbarLanuched}
              onDismiss={closeSnackbar}
              style={styles.snackbar}
            >
              Report successfully submitted!
            </Snackbar>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: '25%'
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  },
  radioButtonGroup: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingLeft: '3%',
    flexDirection: 'row'
  },
  header: {
    width: '100%',
    paddingLeft: '3%'
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
    fontFamily: 'Inter_400Regular',
    paddingLeft: '4%',
    paddingRight: '4%',
    maxHeight: 200,
    width: '90%',
    marginTop: 8
  },
  textInput: {
    fontFamily: 'Inter_400Regular',
    width: '100%',
    borderRadius: 44 / 2,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    margin: 12,

    padding: 10,

    backgroundColor: '#fff'
  },
  button: {
    fontFamily: 'Inter_400Regular',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 4,
    backgroundColor: '#fff',

    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 5,
    borderRadius: 25
  },
  submitbuttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitbutton: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 4,
    backgroundColor: '#fff',
    fontFamily: 'Inter_400Regular',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 5,
    borderRadius: 25
  },
  snackbar: {
    fontFamily: 'Inter_400Regular',
    backgroundColor: 'green'
  }
});

export default NewReport;
