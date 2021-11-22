import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
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
import { useDispatch } from 'react-redux';
import { createNewReport } from '../reducers/reportReducer';
import getGeocoding from '../controllers/apiCalls';

const NewReport = ({ navigation }) => {
  const { image, video, getImage, launchCamera, setImage } = useCamera({});
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [geoCoords, setGeocoords] = useState([]);
  const [reportLocation, setReportLocation] = useState();
  const [open, setDialog] = useState(false);
  const [isPreviewOpened, setPreview] = useState(false);
  const [checkedTopic, setCheckedTopic] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (address) {
      (async () => {
        const features = await getGeocoding(address);
        setGeocoords(features);
      })();
    }
  }, [address]);

  const openDialog = () => setDialog(true);
  const closeDialog = () => setDialog(false);

  const handleChecked = (topic) => {
    setCheckedTopic(topic);
    closeDialog();
  };
  const handlePreviewClosing = () => setPreview(false);
  const openPreview = () => setPreview(true);

  const handleReportSubmission = async () => {
    // push new report to firebase  and updates redux store (asynchronously)
    dispatch(
      createNewReport(image.uri, reportLocation, description, checkedTopic)
    );
    navigation.navigate('HomeStack', { screen: 'HomeStack' });
    setPreview(false);
    setDescription('');
    setCheckedTopic('');
    setImage(null);
    setReportLocation(null);
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
  };

  const LocationPicker = () => {
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
      <LinearGradient colors={['#00c6ff', '#0072ff']} style={styles.background}>
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
              <Text style={styles.subHeader}> Where did this issue occur?</Text>
              {reportLocation && (
                <View style={[styles.helperText]}>
                  <Text>{reportLocation.address}</Text>
                  <IconButton icon="check" />
                </View>
              )}
              <TextInput
                style={styles.textInput}
                onChangeText={(address) => setAddress(address)}
                placeholder="Street adress, city"
                value={address}
              />
            </View>
            {address !== '' && <LocationPicker />}
            <ImagePicker
              image={image}
              video={video}
              getImage={getImage}
              launchCamera={launchCamera}
            />
            <View style={styles.submitbuttonContainer}>
              <Button
                style={styles.submitbutton}
                theme={{ colors: { primary: '#007bff' } }}
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
    color: '#112454'
  },
  description: {
    fontFamily: 'Inter_400Regular',
    paddingLeft: '4%',
    paddingRight: '4%',
    maxHeight: 240,
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
    paddingLeft: '8%',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#112454',
    height: 24
  }
});

export default NewReport;
