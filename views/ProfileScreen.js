import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import UserAvatar from '../components/profile/UserAvatar';
import useCamera from '../hooks/useCamera';
import { Divider, IconButton, List, Menu } from 'react-native-paper';
import EditProfile from '../components/profile/EditProfile';
import AppLoading from 'expo-app-loading';

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
import UserInterestsQuestionnaire from '../components/profile/UserInterestsQuestionnaire';
import { useSelector } from 'react-redux';

const ProfileScreen = ({ navigation }) => {
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
  const user = useSelector((state) => state.currentUser);
  const { image, getImage, launchCamera } = useCamera({ aspect: [4, 3] });
  const [isExpanded, setAccordion] = useState({
    personalData: false,
    events: false,
    interests: false
  });
  const [isInterestListExpanded, setNestedAccordion] = useState({
    Hobbies: false,
    Interests: false,
    Preferences: false
  });
  const [isOpen, setMoreMenu] = useState(false);
  const [isEditDialogOpen, setEditDialog] = useState(false);
  const [isQuestionnaireOpened, setQuestionnaire] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (text) => setName(text);
  const handleEmailChange = (text) => setEmail(text);
  const handlePasswordChange = (text) => setPassword(text);

  const closeMoreMenu = () => setMoreMenu(false);

  // opens a dialog for user to edit their profile info
  const openEditDialog = () => setEditDialog(true);
  const closeEditDialog = () => setEditDialog(false);
  const handleMenuItemEditProfilePress = () => {
    closeMoreMenu();
    openEditDialog();
  };

  // launches questionnaire for user's interests and preferences
  const openQuestionnaire = () => setQuestionnaire(true);
  const closeQuestionnaire = () => setQuestionnaire(false);

  const handleProfileUpdate = () => {
    closeEditDialog();
  };

  // controlls list expansion or colapse
  const openAccordion = (expanded) => () =>
    setAccordion({
      ...isExpanded,
      personalData:
        expanded !== 'personalData' ? false : !isExpanded.personalData,
      interests: expanded !== 'interests' ? false : !isExpanded.interests,
      events: expanded !== 'events' ? false : !isExpanded.events
    });
  // controlls lists nested in the interests and preferences Accordion
  const openNestedAccordion = (expanded) => () =>
    setNestedAccordion({
      ...isInterestListExpanded,
      Hobbies: expanded !== 'Hobbies' ? false : !isInterestListExpanded.Hobbies,
      Interests:
        expanded !== 'Interests' ? false : !isInterestListExpanded.Interests,
      Preferences:
        expanded !== 'Preferences' ? false : !isInterestListExpanded.Preferences
    });

  const moreMenu = () => {
    const anchorEl = (
      <TouchableOpacity onPress={() => openEditDialog()}>
        <IconButton
          labelStyle={{ fontSize: 30 }}
          style={styles.editprofilebutton}
          color={'#007bff'}
          icon="pencil"
        />
      </TouchableOpacity>
    );

    return (
      <Menu
        visible={isOpen}
        onDismiss={closeMoreMenu}
        anchor={anchorEl}
        style={styles.menu}
      >
        <Menu.Item onPress={closeMoreMenu} title="Settings/Preferences" />
        <Divider />
        <Menu.Item
          onPress={handleMenuItemEditProfilePress}
          title="Edit Profile"
        />
      </Menu>
    );
  };

  const userPreferences = (data, title) => {
    return (
      <List.Accordion
        theme={{ colors: { primary: '#007bff' } }}
        title={title}
        expanded={isInterestListExpanded[title]}
        onPress={openNestedAccordion(title)}
        style={styles.accordion}
      >
        <View>
          {data?.map((item) => (
            <List.Item key={item} title={item} style={styles.accordionItme} />
          ))}
        </View>
      </List.Accordion>
    );
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <LinearGradient colors={['#00c6ff', '#0072ff']} style={styles.background}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <UserAvatar />

                {moreMenu()}
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.username}>
                  {name ? name : 'MyCircle App '}
                </Text>
              </View>
            </View>
            <List.Section style={styles.listsection}>
              <List.Accordion
                theme={{ colors: { primary: '#007bff' } }}
                title="Personal Data"
                left={(props) => (
                  <List.Icon {...props} icon="account" color={'#007bff'} />
                )}
                expanded={isExpanded.personalData}
                onPress={openAccordion('personalData')}
                style={styles.accordion}
              >
                <List.Item title={user?.name} style={styles.accordionItme} />
                <List.Item title={user?.email} style={styles.accordionItme} />
              </List.Accordion>
              <Divider style={styles.divier} />
              <List.Accordion
                theme={{ colors: { primary: '#007bff' } }}
                title="Saved Events"
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="calendar-heart"
                    color={'#007bff'}
                  />
                )}
                expanded={isExpanded.events}
                onPress={openAccordion('events')}
                style={styles.accordion}
              >
                <List.Item title="First item" style={styles.accordionItme} />
                <List.Item title="Second item" style={styles.accordionItme} />
              </List.Accordion>
              <Divider style={styles.divier} />
              <List.Accordion
                theme={{ colors: { primary: '#007bff' } }}
                title="Interests &amp; Preferences"
                description="set your interests to receive personalised contextual content"
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="account-cog-outline"
                    color={'#007bff'}
                  />
                )}
                expanded={isExpanded.interests}
                onPress={openAccordion('interests')}
                style={styles.accordion}
              >
                <List.Item
                  title="Set Your Interests"
                  style={styles.accordionItme}
                  onPress={() => openQuestionnaire()}
                />
                {userPreferences(user?.userInterests?.hobbies, 'Hobbies')}
                {userPreferences(user?.userInterests?.interests, 'Interests')}
                {userPreferences(
                  user?.userInterests?.preferences,
                  'Preferences'
                )}
              </List.Accordion>
            </List.Section>
            <EditProfile
              email={email}
              name={name}
              password={password}
              image={image?.uri}
              handleEmailChange={handleEmailChange}
              handleNameChange={handleNameChange}
              handlePasswordChange={handlePasswordChange}
              open={isEditDialogOpen}
              closeDialog={closeEditDialog}
              action={handleProfileUpdate}
              launchCamera={launchCamera}
              getImage={getImage}
            />
            <UserInterestsQuestionnaire
              isQuestionnaireOpened={isQuestionnaireOpened}
              closeFirstQuestionnaireDialog={closeQuestionnaire}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  },
  container: {
    flex: 1,
    paddingTop: '20%'
  },
  accordion: {
    backgroundColor: '#fff',
    color: '#566787',
    fontFamily: 'Inter_400Regular'
  },
  accordionItme: {
    backgroundColor: '#fff',
    color: '#566787',
    fontFamily: 'Inter_400Regular'
  },
  divier: {
    backgroundColor: 'transparent',
    height: '1%'
  },
  avatar: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    width: 300,
    position: 'relative'
  },
  avatarContainer: {
    flex: 0.9,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    margin: '5%'
  },

  editprofilebutton: {
    padding: 5,
    backgroundColor: '#FFF',
    width: 52,
    height: 52,
    borderTopEndRadius: 500,
    borderTopStartRadius: 500,
    borderBottomRightRadius: 500,
    borderBottomLeftRadius: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flex: 1,
    height: 300,
    width: 200
  },
  listsection: {},
  username: {
    color: '#112454',
    margin: '5%',
    fontSize: 30,
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    fontFamily: 'Inter_700Bold'
  },
  moreIcon: {
    backgroundColor: '#9042f5',
    color: '#fff'
  }
});

export default ProfileScreen;
