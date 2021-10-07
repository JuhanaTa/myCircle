import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserAvatar from '../components/profile/UserAvatar';
import useCamera from '../hooks/useCamera';
import { Divider, IconButton, List, Menu } from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const ProfileScreen = ({ navigation }) => {
  const { image, getImage, launchCamera } = useCamera({ aspect: [4, 3] });
  const [isExpanded, setAccordion] = useState({
    personalData: false,
    events: false,
    interests: false
  });
  const [isOpen, setMoreMenu] = useState(false);
  const openMoreMenu = () => setMoreMenu(true);
  const closeMoreMenu = () => setMoreMenu(false);

  // controlls list expansion or colapse
  const openAccordion = (expanded) => () =>
    setAccordion({
      ...isExpanded,
      personalData:
        expanded !== 'personalData' ? false : !isExpanded.personalData,
      interests: expanded !== 'interests' ? false : !isExpanded.interests,
      events: expanded !== 'events' ? false : !isExpanded.events
    });

  const moreMenu = () => {
    const anchorEl = <IconButton onPress={openMoreMenu} icon="dots-vertical" size={24}  color={'#4615b2'} />;

    return (
      <Menu visible={isOpen} onDismiss={closeMoreMenu} anchor={anchorEl}>
        <Menu.Item onPress={closeMoreMenu} title="Settings/Preferences" />
        <Divider />
        <Menu.Item onPress={closeMoreMenu} title="Edit Profile" />
      </Menu>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <UserAvatar image={image} />
          <Text style={styles.username}>Your Name</Text>
        </View>
        {moreMenu()}
      </View>

      <List.Section>
        <List.Accordion
          title="Personal Data"
          left={(props) => <List.Icon {...props} icon="account" />}
          expanded={isExpanded.personalData}
          onPress={openAccordion('personalData')}
          style={styles.accordion}
        >
          <List.Item title="@username" />
          <List.Item title="first.last@me.fi" />
        </List.Accordion>
        <Divider style={styles.divier} />
        <List.Accordion
          title="Saved Events"
          left={(props) => <List.Icon {...props} icon="calendar-heart" />}
          expanded={isExpanded.events}
          onPress={openAccordion('events')}
          style={styles.accordion}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
        <Divider style={styles.divier} />
        <List.Accordion
          title="Interests &amp; Preferences"
          description="set your interests to receive personalised contextual content"
          left={(props) => <List.Icon {...props} icon="account-cog-outline" />}
          expanded={isExpanded.interests}
          onPress={openAccordion('interests')}
          style={styles.accordion}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: '1%'
  },
  accordion: {
    marginBottom: '1%',
    marginTop: '1%'
  },
  divier: {
    backgroundColor: '#fff',
    height: '1%'
  },
  avatar: {
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  avatarContainer: {
    flex: 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '4%',
    marginTop: '2%'
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: '11%'
  },
  moreIcon: {
    backgroundColor: '#9042f5',
    color: '#fff'
  }
});

export default ProfileScreen;
