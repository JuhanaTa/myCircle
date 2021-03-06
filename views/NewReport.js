import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import * as Location from 'expo-location';
import { Button, IconButton } from 'react-native-paper';
import ImagePicker from '../components/reports/ImagePicker';
import PreviewReport from '../components/reports/PreviewReport';
import ReportTopics from '../components/reports/ReportTopics';
import AppLoading from 'expo-app-loading';
import useCamera from '../hooks/useCamera';
import { LinearGradient } from 'expo-linear-gradient';
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
import { useDispatch, useSelector } from 'react-redux';
import { createNewReport } from '../reducers/reportReducer';
import getGeocoding from '../controllers/apiCalls';
import getAddress from '../controllers/searchAddress';
import ModalDialog from '../components/globalReUseAbles/ModalDialog';
import BackgroundImage from '../components/BackgorundCircle';
import firebase from 'firebase';
import ReportLocationHow from '../components/reports/ReportLocationHow';

const NewReport = ({ navigation }) => {
  const { image, video, getImage, launchCamera, setImage } = useCamera({});
  const [isImgPickerMenuOpened, setImgPickerMenu] = useState(false);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [geoCoords, setGeocoords] = useState([]);
  const [reportLocation, setReportLocation] = useState();
  const [recommendImage, setImageRecommendation] = useState(false);
  const [isPreviewOpened, setPreview] = useState(false);
  const [checkedTopic, setCheckedTopic] = useState();
  const [useLocation, setUseLocation] = useState(true);
  const [useAddress, setUseAdress] = useState(false);
  const [error, setError] = useState({
    topic: false,
    description: false,
    location: false
  });
  const { currentUser } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (address) {
      (async () => {
        const features = await getGeocoding(address);
        setGeocoords(features);
      })();
    }
  }, [address]);

  const handleChecked = (topic) => {
    setCheckedTopic(topic);
    setError({
      ...error,
      topic: false
    });
  };
  const onChangeDescription = (text) => {
    setDescription(text);
    setError({
      ...error,
      description: false
    });
  };

  const handlePreviewClosing = () => setPreview(false);
  const openPreview = () => {
    // validates report form before submission

    if (useLocation) {
      if (checkedTopic && description) {
        if (image?.uri) {
          return setPreview(true);
        }
        return setImageRecommendation(true);
      }
      setError({
        topic: !checkedTopic && true,
        description: !description && true,
        location: !reportLocation && true
      });
    } else {
      if (checkedTopic && description && reportLocation) {
        if (image?.uri) {
          return setPreview(true);
        }
        return setImageRecommendation(true);
      }
      setError({
        topic: !checkedTopic && true,
        description: !description && true,
        location: !reportLocation && true
      });
    }
  };

  const validateDescription = () => {
    if (description) {
      const wordCount = description.split(' ').length;
      return wordCount < 4;
    }
    return false;
  };

  const InvalidAddress = () => {
    if (address && !geoCoords.length) {
      return (
        <View style={[styles.helperText]}>
          <Text style={styles.errorText}>Invalid address!</Text>
        </View>
      );
    }
    return null;
  };

  const previewReportWithoutImage = () => {
    setImageRecommendation(false);
    setPreview(true);
  };
  const closeImageRecommendationDialog = () => {
    setImageRecommendation(false);
    setImgPickerMenu(true);
  };

  const handleReportSubmission = async () => {
    //we will get current date for submission
    const currentTime = firebase.firestore.Timestamp.fromDate(new Date());
    const createReport = (currentOrProvidedLocation) => {
      dispatch(
        createNewReport(
          image?.uri,
          currentOrProvidedLocation,
          description,
          checkedTopic,
          currentUser?.gamePoints,
          currentTime,
          'pending'
        )
      );
      navigation.navigate('HomeStack', { screen: 'HomeStack' });
      setPreview(false);
      setDescription('');
      setCheckedTopic('');
      setImage(null);
      setReportLocation(null);
    };

    if (useLocation) {
      const userLoc = await getLocation();
      const address = await getAddress(
        userLoc.coords.latitude,
        userLoc.coords.longitude
      );
      //console.log('address from api', address);
      const locationOfReport = {
        address: `${address.features[0].properties.name}, ${address.features[0].properties.locality}`,
        latitude: userLoc.coords.latitude,
        longitude: userLoc.coords.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0
      };
      // push new report to firebase  and updates redux store (asynchronously)
      return createReport(locationOfReport);
    }
    return createReport(reportLocation);
  };

  const onReportLocationSelected = (location) => {
    setReportLocation({
      latitude: location.geometry.coordinates[1],
      longitude: location.geometry.coordinates[0],
      latitudeDelta: 0,
      longitudeDelta: 0,
      address: location.properties.label
    });
    setAddress('');
    setGeocoords([]);
    setError({
      ...error,
      location: false
    });
  };

  const LocationPicker = () => {
    if (address && geoCoords.length) {
      return (
        <View style={styles.locationPicker}>
          {geoCoords.map((location) => (
            <TouchableOpacity
              key={location.properties.id}
              onPress={() => onReportLocationSelected(location)}
            >
              <Text style={styles.address}> {location.properties.label} </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    return null;
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

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      //navigation.popToTop();
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    return location;
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <LinearGradient colors={['#00c6ff', '#0072ff']} style={styles.background}>
        <BackgroundImage></BackgroundImage>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.mainHeader}>Add a new report</Text>
              <Text style={styles.subHeader}> Choose report topic</Text>
              {error.topic && (
                <View style={[styles.helperText]}>
                  <Text style={styles.errorText}>
                    Report topic is required!
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.radioButtonGroup}>
              <ReportTopics checked={checkedTopic} setChecked={handleChecked} />
            </View>
            <View style={styles.description}>
              <Text style={styles.subHeader}> Add description to report.</Text>
              {error.description && (
                <View style={[styles.helperText]}>
                  <Text style={styles.errorText}>Description is required!</Text>
                </View>
              )}
              {validateDescription() && (
                <View style={[styles.helperText]}>
                  <Text style={styles.errorText}>
                    Too short, 3 words minimum!
                  </Text>
                </View>
              )}
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => onChangeDescription(text)}
                placeholder="Description"
                value={description}
              />
              <Text style={styles.subHeader}>How to locate this report?</Text>
              <View style={styles.radioButtonGroup}>
                <ReportLocationHow
                  useAddress={useAddress}
                  useLocation={useLocation}
                  setUseAdress={setUseAdress}
                  setUseLocation={setUseLocation}
                />
              </View>

              {useAddress && (
                <>
                  <Text style={styles.subHeader}> Where is this report?</Text>
                  {reportLocation && (
                    <View style={[styles.helperText]}>
                      <Text>{reportLocation.address}</Text>
                      <IconButton icon="check" />
                    </View>
                  )}

                  {error.location && (
                    <View style={[styles.helperText]}>
                      <Text style={styles.errorText}>
                        This field is required!
                      </Text>
                    </View>
                  )}
                  <InvalidAddress />
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(address) => setAddress(address)}
                    placeholder="Street adress, city"
                    value={address}
                  />
                </>
              )}
              {useLocation && (
                <Text
                  style={[
                    styles.subHeader,
                    { alignSelf: 'center', textAlign: 'center' }
                  ]}
                >
                  We will use your gps location for this report.
                </Text>
              )}

              {useAddress && <LocationPicker />}

              <Button
                style={styles.submitbutton}
                theme={{ colors: { primary: '#007bff' } }}
                onPress={openPreview}
                accessibilityLabel="preview report and send"
              >
                Submit
              </Button>
              <ImagePicker
                image={image}
                video={video}
                getImage={getImage}
                launchCamera={launchCamera}
                open={isImgPickerMenuOpened}
                setMenu={setImgPickerMenu}
              />
              <PreviewReport
                open={isPreviewOpened}
                closeDialog={handlePreviewClosing}
                action={handleReportSubmission}
                topic={checkedTopic}
                description={description}
                image={image}
              />
              <ModalDialog
                open={recommendImage}
                closeDialog={() => setImageRecommendation(false)}
                action={previewReportWithoutImage}
                label="Continue"
                title=" A Picture is worth a thousand words!"
                secondaryAction={
                  <Button
                    icon="camera"
                    onPress={closeImageRecommendationDialog}
                  >
                    Pick Image
                  </Button>
                }
              >
                <Text style={styles.dialogText}>
                  Support your description with an image! If you choose to
                  continue without an image, press &#39; Continue &#39; below to
                  submit your report.
                </Text>
              </ModalDialog>
            </View>
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
    justifyContent: 'flex-start'
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
    color: '#112454'
  },
  description: {
    fontFamily: 'Inter_400Regular',
    paddingLeft: '4%',
    paddingRight: '4%',
    width: '100%',
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
    alignSelf: 'center',
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
    shadowOffset: { width: 0, height: 3 },
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
    width: '90%',
    alignSelf: 'center',
    margin: 10,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 4,
    backgroundColor: '#fff',
    fontFamily: 'Inter_400Regular',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    borderRadius: 25
  },
  locationPicker: {
    fontFamily: 'Inter_400Regular',
    backgroundColor: '#fff',
    marginLeft: '8%',
    marginRight: '4%',
    padding: 8,
    width: '80%',
    borderRadius: 8
  },
  address: {
    padding: 8
  },
  helperText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: '8%',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#112454',
    height: 24
  },
  errorText: {
    color: '#d32f2f',
    backgroundColor: '#fff',
    padding: '1%',
    paddingLeft: '3%',
    paddingRight: '3%',
    borderRadius: 44 / 2
  },
  dialogText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    padding: '2%'
  }
});

export default NewReport;
