import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { TextInput, Menu, Divider, IconButton } from 'react-native-paper';
import ModalDialog from '../globalReUseAbles/ModalDialog';
import UserAvatar from './UserAvatar';

const EditProfile = ({
  open,
  closeDialog,
  action,
  image,
  name,
  email,
  password,
  handleNameChange,
  handleEmailChange,
  handlePasswordChange,
  launchCamera,
  getImage
}) => {
  // dialog for editing user's profile

  const [isCameraOpen, setCameraMenu] = useState(false);

  const openCameraMenu = () => setCameraMenu(true);
  const closeCameraMenu = () => setCameraMenu(false);

  const handleImagePicking = () => {
    getImage();
    closeCameraMenu();
  };
  const handleCamershot = () => {
    launchCamera();
    closeCameraMenu();
  };

  const cameramenu = () => {
    const anchorEl = (
      <IconButton
        onPress={openCameraMenu}
        icon="camera"
        labelStyle={{ fontSize: 30 }}
        style={styles.editprofilebutton}
        color={'#007bff'}
      />
    );

    return (
      <Menu
        visible={isCameraOpen}
        onDismiss={closeCameraMenu}
        anchor={anchorEl}
      >
        <Menu.Item onPress={handleCamershot} title="camera" />
        <Divider />
        <Menu.Item onPress={handleImagePicking} title="pick from gallery" />
      </Menu>
    );
  };

  return (
    <ModalDialog
      open={open}
      closeDialog={closeDialog}
      action={action}
      theme={{ colors: { primary: '#112454' } }}
      label="Save"
      title="Edit Your Profile"
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.avatar}>
            <UserAvatar image={image} size={110} />
            {cameramenu()}
          </View>

          <TextInput
            value={name}
            onChangeText={handleNameChange}
            label="name"
            style={styles.textInput}
            theme={{ colors: { primary: '#112454' } }}
            right={<TextInput.Icon name="pencil" />}
          />
          <TextInput
            value={email}
            style={styles.textInput}
            theme={{ colors: { primary: '#112454' } }}
            onChangeText={handleEmailChange}
            label="email"
            right={<TextInput.Icon name="email-edit" />}
          />
          <TextInput
            value={password}
            style={styles.textInput}
            theme={{ colors: { primary: '#112454' } }}
            onChangeText={handlePasswordChange}
            label="password"
            right={<TextInput.Icon name="eye" />}
            secureTextEntry
          />
        </View>
      </ScrollView>
    </ModalDialog>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    padding: 10
  },
  avatar: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    position: 'relative',
    marginBottom: 20
  },
  editprofilebutton: {
    padding: 5,
    backgroundColor: '#D3D3D3',
    width: 40,
    height: 40,
    borderTopEndRadius: 500,
    borderTopStartRadius: 500,
    borderBottomRightRadius: 500,
    borderBottomLeftRadius: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5
  },
  textInput: {
    marginLeft: '4%',
    width: '100%',
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    fontFamily: 'Inter_400Regular'
  }
});

export default EditProfile;
