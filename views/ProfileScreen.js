import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import UserAvatar from '../components/profile/UserAvatar';
import useCamera from '../hooks/useCamera';
import { Divider, IconButton, List, Menu } from 'react-native-paper';
import EditProfile from '../components/profile/EditProfile';

const ProfileScreen = ({ navigation }) => {
  const { image, getImage, launchCamera } = useCamera({ aspect: [4, 3] });
  const [isExpanded, setAccordion] = useState({
    personalData: false,
    events: false,
    interests: false
  });
  const [isOpen, setMoreMenu] = useState(false);
  const [isEditDialogOpen, setEditDialog] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (text) => setName(text);
  const handleEmailChange = (text) => setEmail(text);
  const handlePasswordChange = (text) => setPassword(text);

  const openMoreMenu = () => setMoreMenu(true);
  const closeMoreMenu = () => setMoreMenu(false);

  // opens a dialog for user to edit their profile info
  const openEditDialog = () => setEditDialog(true);
  const closeEditDialog = () => setEditDialog(false);
  const handleMenuItemEditProfilePress = () => {
    closeMoreMenu();
    openEditDialog();
  };

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

  const moreMenu = () => {
    const anchorEl = (
      <IconButton
        onPress={openMoreMenu}
        icon="dots-vertical"
        size={24}
        color={'#4615b2'}
      />
    );

    return (
      <Menu visible={isOpen} onDismiss={closeMoreMenu} anchor={anchorEl}>
        <Menu.Item onPress={closeMoreMenu} title="Settings/Preferences" />
        <Divider />
        <Menu.Item onPress={handleMenuItemEditProfilePress} title="Edit Profile" />
      </Menu>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <TouchableOpacity onPress={openEditDialog}>
            <UserAvatar image={image?.uri} />
          </TouchableOpacity>
          <Text style={styles.username}>{name ? name : 'MyCircle App '}</Text>
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
          <List.Item title={email ? email : 'first.last@me.fi'} />
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
    flex: 0.9,
    flexDirection: 'row',
    justifyContent: 'center'
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
    marginTop: '11%',
    marginLeft: '4%'
  },
  moreIcon: {
    backgroundColor: '#9042f5',
    color: '#fff'
  }
});

export default ProfileScreen;
