import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import EventList from '../components/EventList';
import AppLoading from 'expo-app-loading';
import BackgroundImage from '../components/BackgorundCircle';

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
import ModalDialog from '../components/globalReUseAbles/ModalDialog';
import ReportTopics from '../components/reports/ReportTopics';
import { calculateDistance } from '../utils/DistanceCalculator';
import { IconButton } from 'react-native-paper';
import * as Location from 'expo-location';
export default function EventListScreen({ navigation }) {
  // returns reports from redux store
  const reportsData = useSelector((store) => store.reports);

  const [isFilterDialogOpen, setFilterDialogOpen] = useState(false);
  const [checkedTopic, setCheckedTopic] = useState('');
  const [filteredReports, setFilteredReports] = useState([]);
  const openFilterMenu = () => setFilterDialogOpen(true);

  const closeFilterMenu = () => {
    setFilterDialogOpen(false);
    //deleteFilters();
  };

  const handleChecked = (topic) => {
    setCheckedTopic(topic);
    applyFilterToReports(topic);
  };

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

  const deleteFilters = async () => {
    const loopedReports = [];
    const location = await getLocation();

    reportsData.forEach((element) => {
      if (element.location != '') {
        if (
          calculateDistance(
            element.location.latitude,
            element.location.longitude,
            location.coords.latitude,
            location.coords.longitude
          ) <= 10
        ) {
          loopedReports.push(element);
        } else {
          console.log('too far');
        }
      }
    });

    setFilteredReports(loopedReports);
    setCheckedTopic('');
  };

  const applyFilterToReports = async (topic) => {
    const loopedReports = [];

    const location = await getLocation();

    reportsData.forEach((element) => {
      if (element.location != '') {
        if (
          calculateDistance(
            element.location.latitude,
            element.location.longitude,
            location.coords.latitude,
            location.coords.longitude
          ) <= 10
        ) {
          if (element.topic == topic) {
            loopedReports.push(element);
          } else {
            console.log('wrong topic');
          }
        } else {
          console.log('too far');
        }
      }
    });

    setFilteredReports(loopedReports);
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

  useEffect(() => {
    setFilteredReports(reportsData);
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#00c6ff', '#0072ff']}
          style={styles.background}
        />
        <BackgroundImage></BackgroundImage>
        <View style={styles.header}>
          <Text style={styles.mainHeader}>All reports near you</Text>
          {checkedTopic.length == 0 ? (
            <IconButton
              title="asd"
              icon="filter-outline"
              color={'#007bff'}
              style={{ backgroundColor: 'white' }}
              size={30}
              onPress={() => openFilterMenu()}
            ></IconButton>
          ) : (
            <View style={styles.filterWithDelete}>
              <IconButton
                title="asd"
                icon="filter-outline"
                color={'#007bff'}
                style={{ backgroundColor: 'white' }}
                size={30}
                onPress={() => openFilterMenu()}
              ></IconButton>
              <IconButton
                title="asd"
                icon="close"
                color={'#007bff'}
                style={{ backgroundColor: 'white' }}
                size={30}
                onPress={async () => {
                  await deleteFilters();
                }}
              ></IconButton>
            </View>
          )}
        </View>
        <View>
          {checkedTopic != '' && (
            <>
              {filteredReports.length > 0 ? (
                <Text style={styles.selectedFilter}>
                  Selected Filter: {checkedTopic}
                </Text>
              ) : (
                <>
                  <Text style={styles.selectedFilter}>
                    Selected Filter: {checkedTopic}
                  </Text>
                  <View>
                    <Text style={styles.selectedFilter}>
                      No Reports with current filter
                    </Text>
                  </View>
                </>
              )}
            </>
          )}
        </View>

        {filteredReports && (
          <EventList
            navigation={navigation}
            reportsData={filteredReports}
          ></EventList>
        )}

        <ModalDialog
          open={isFilterDialogOpen}
          closeDialog={closeFilterMenu}
          theme={{ colors: { primary: '#112454' } }}
          label="Apply"
          title="Edit Filters"
        >
          <ScrollView>
            <View style={styles.container}>
              <ReportTopics checked={checkedTopic} setChecked={handleChecked} />
            </View>
          </ScrollView>
        </ModalDialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  },
  header: {
    marginTop: '5%',
    marginBottom: '5%',
    width: '100%',
    paddingLeft: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainHeader: {
    color: '#fff',
    paddingLeft: '3%',
    paddingTop: '2%',
    paddingBottom: '4%',
    fontSize: 25,

    textAlign: 'left',
    display: 'flex',
    fontFamily: 'Inter_700Bold'
  },

  selectedFilter: {
    color: '#fff',
    paddingLeft: '6%',
    paddingTop: '2%',
    paddingBottom: '4%',
    fontSize: 12,

    textAlign: 'left',
    display: 'flex',
    fontFamily: 'Inter_700Bold'
  },
  filterWithDelete: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noreports: {}
});
