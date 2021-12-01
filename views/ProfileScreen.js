import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  ImageBackground
} from 'react-native';
import startImage from '../assets/game-image/start.png';
import middleImage from '../assets/game-image/suburb.png';
import biggestImage from '../assets/game-image/City.png';
import {Button} from 'react-native-paper';
import UserAvatar from '../components/profile/UserAvatar';
import {IconButton} from 'react-native-paper';
import EditProfile from '../components/profile/EditProfile';
import AppLoading from 'expo-app-loading';
import BackgroundImage from '../components/BackgorundCircle';

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
import UserInterestsQuestionnaire from '../components/profile/UserInterestsQuestionnaire';
import {useDispatch, useSelector} from 'react-redux';
import AvatarGenerator from '../components/profile/AvatarGenerator';
import getAvatarUri, {
  avatarDefaults,
  getRandomisedAvatarOptions
} from '../components/profile/avatarConfig';
import {modifyCurrentUser} from '../reducers/currentUserReducer';
import ProfileSectionContainer from '../components/profile/ProfileSectionContainer';
import {logOut} from '../controllers/firebaseController';

const ProfileScreen = ({navigation}) => {
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
  const {currentUser} = useSelector((state) => state);
  const dispatch = useDispatch();
  const [avatarOptions, setAvatar] = useState({
    ...currentUser.userAvatar.options
  });
  const [visible, setVisible] = useState(true);
  const [isAvatarSystemOpened, setAvatarSystem] = useState(false);
  const [isPersonalDataOpened, setPersonalData] = useState(true);
  const [isInterestOpened, setInterest] = useState(false);
  const [isEventOpened, setEvent] = useState(false);
  const [isEditDialogOpen, setEditDialog] = useState(false);
  const [isQuestionnaireOpened, setQuestionnaire] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (text) => setName(text);
  const handleEmailChange = (text) => setEmail(text);
  const handlePasswordChange = (text) => setPassword(text);

  // opens a dialog for user to edit their profile info
  const openEditDialog = () => setEditDialog(true);
  const closeEditDialog = () => setEditDialog(false);

  // launches questionnaire for user's interests and preferences
  const openQuestionnaire = () => setQuestionnaire(true);
  const closeQuestionnaire = () => setQuestionnaire(false);

  const handleProfileUpdate = () => {
    closeEditDialog();
  };

  const generateAvatar = (option) => {
    setAvatar({...avatarOptions, [option.varName]: option.value});
  };
  // generate a random avatar
  const generateRandomAvatar = () => {
    setAvatar(getRandomisedAvatarOptions());
  };

  // handle profile tab nav
  const handleTabPress = (type) => {
    switch (type) {
      case 'interests':
        setInterest(true);
        setPersonalData(false);
        setEvent(false);
        setAvatarSystem(false);
        return;
      case 'events':
        setInterest(false);
        setPersonalData(false);
        setEvent(true);
        setAvatarSystem(false);
        return;
      case 'personalData':
        setInterest(false);
        setPersonalData(true);
        setEvent(false);
        setAvatarSystem(false);
        return;
      case 'avatar':
        setInterest(false);
        setPersonalData(false);
        setEvent(false);
        setAvatarSystem(true);
        return;

      default:
        return;
    }
  };

  const saveAvatarToDb = () =>
    dispatch(
      modifyCurrentUser({
        userAvatar: {
          uri: getAvatarUri(
            avatarOptions.avatarStyle,
            avatarOptions.topType,
            avatarOptions.accessoriesType,
            avatarOptions.hairColor,
            avatarOptions.facialHairType,
            avatarOptions.clotheType,
            avatarOptions.eyeType,
            avatarOptions.eyebrowType,
            avatarOptions.mouthType,
            avatarOptions.skinColor
          ),
          options: {
            avatarStyle: avatarOptions.avatarStyle,
            topType: avatarOptions.topType,
            accessoriesType: avatarOptions.accessoriesType,
            hairColor: avatarOptions.hairColor,
            facialHairType: avatarOptions.facialHairType,
            clotheType: avatarOptions.clotheType,
            eyeType: avatarOptions.eyeType,
            eyebrowType: avatarOptions.eyebrowType,
            mouthType: avatarOptions.mouthType,
            skinColor: avatarOptions.skinColor
          }
        }
      })
    );

  const resetAvatar = () => {
    setAvatar({...avatarDefaults});
  };

  const navBarItems = [
    {type: 'avatar', icon: 'pencil', state: isAvatarSystemOpened},
    {type: 'interests', icon: 'account-cog-outline', state: isInterestOpened},
    {type: 'personalData', icon: 'account', state: isPersonalDataOpened},
    {type: 'events', icon: 'calendar-heart', state: isEventOpened}
  ];

  const NavBar = () => {
    return (
      <View style={styles.navBar}>
        {navBarItems.map((item) => (
          <TouchableOpacity
            key={item.type}
            onPress={() => handleTabPress(item.type)}
          >
            <IconButton
              labelStyle={{fontSize: 30}}
              style={[
                styles.editprofilebutton,
                item.state && {backgroundColor: '#112454'}
              ]}
              color={item.state ? '#ffffff' : '#007bff'}
              icon={item.icon}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  let DEFAULT_IMAGE;
  if (currentUser?.gamePoints >= 0 && currentUser?.gamePoints < 2000) {
    DEFAULT_IMAGE = Image.resolveAssetSource(startImage).uri;
  }
  if (currentUser?.gamePoints >= 2000 && currentUser?.gamePoints < 30000) {
    DEFAULT_IMAGE = Image.resolveAssetSource(middleImage).uri;
  }
  if (currentUser?.gamePoints > 30000) {
    DEFAULT_IMAGE = Image.resolveAssetSource(biggestImage).uri;
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <LinearGradient colors={['#00c6ff', '#0072ff']} style={styles.background}>
        <BackgroundImage></BackgroundImage>
        <ScrollView contentContainerStyle={styles.list}>
          <View style={styles.container}>
                <Button
                  style={styles.button}
                  theme={{colors: {primary: '#007bff'}}}
                  onPress={async () => {
                    await logOut();
                  }}
                >
                  Log out
                </Button>
            <ImageBackground
              source={{uri: DEFAULT_IMAGE}}
              resizeMode="cover"
              style={styles.image}
            >
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <UserAvatar
                    uri={
                      visible
                        ? getAvatarUri(
                          avatarOptions.avatarStyle,
                          avatarOptions.topType,
                          avatarOptions.accessoriesType,
                          avatarOptions.hairColor,
                          avatarOptions.facialHairType,
                          avatarOptions.clotheType,
                          avatarOptions.eyeType,
                          avatarOptions.eyebrowType,
                          avatarOptions.mouthType,
                          avatarOptions.skinColor
                        )
                        : currentUser?.userAvatar.uri
                    }
                    transparent={avatarOptions.avatarStyle === 'Transparent'}
                  />
                </View>
              </View>
            </ImageBackground>

            <ScrollView
              style={{
                flex: 1,
                height: '100%',
                width: '100%',
                backgroundColor: '#f2f4f7',
                paddingTop: '8%',
                paddingBottom: '5%',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25
              }}
            >
              <NavBar />
              <View style={styles.infoContainer}>
                <Text style={styles.username}>
                  {currentUser?.name ? currentUser?.name : 'User '}
                </Text>
                <Text style={styles.points}>
                  {currentUser?.gamePoints} Points
                </Text>
              </View>
              <AvatarGenerator
                generateAvatar={generateAvatar}
                generateRandomAvatar={generateRandomAvatar}
                resetAvatar={resetAvatar}
                saveAvatarToDb={saveAvatarToDb}
                setVisible={setVisible}
                visible={visible}
                isAvatarSystemOpened={isAvatarSystemOpened}
              />
              <ProfileSectionContainer
                visible={isPersonalDataOpened}
                title="Personal Data"
                type="personalData"
                action={
                  <TouchableOpacity onPress={openEditDialog}>
                    <IconButton icon="pencil" />
                  </TouchableOpacity>
                }
              />

              <ProfileSectionContainer
                visible={isInterestOpened}
                title="Your Interests"
                type="interests"
                action={
                  <TouchableOpacity onPress={openQuestionnaire}>
                    <IconButton icon="pencil" />
                  </TouchableOpacity>
                }
              />

              <ProfileSectionContainer
                visible={isEventOpened}
                title="Saved Events"
                type="events"
              />

              <EditProfile
                email={email}
                name={name}
                password={password}
                handleEmailChange={handleEmailChange}
                handleNameChange={handleNameChange}
                handlePasswordChange={handlePasswordChange}
                open={isEditDialogOpen}
                closeDialog={closeEditDialog}
                action={handleProfileUpdate}
              />
              <UserInterestsQuestionnaire
                isQuestionnaireOpened={isQuestionnaireOpened}
                closeFirstQuestionnaireDialog={closeQuestionnaire}
                openQuestionnaire={openQuestionnaire}
                handleTabPress={handleTabPress}
              />
            </ScrollView>
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
  list: {
    flex: 1,
    height: '100%'
  },
  container: {
    flex: 1,

    height: '100%'
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    width: 300,
    position: 'relative'
  },
  avatarContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },

  editprofilebutton: {
    padding: 5,
    backgroundColor: '#FFF',
    width: 40,
    height: 40,
    borderTopEndRadius: 400,
    borderTopStartRadius: 400,
    borderBottomRightRadius: 400,
    borderBottomLeftRadius: 400,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 5
  },

  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navBar: {
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
    margin: '1%',
    fontSize: 30,

    textAlign: 'center',
    display: 'flex',
    fontFamily: 'Inter_700Bold'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '20%'
  },
  points: {
    color: '#112454',
    margin: '2%',
    fontSize: 20,

    textAlign: 'center',
    display: 'flex',
    fontFamily: 'Inter_500Medium'
  },
  moreIcon: {
    backgroundColor: '#9042f5',
    color: '#fff'
  },
  button: {
    fontFamily: 'Inter_400Regular',
    marginTop: 5,
    marginLeft: 'auto',
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 44 / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
});

export default ProfileScreen;
