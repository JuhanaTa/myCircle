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
        size={24}
        color={'#4615b2'}
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
            right={<TextInput.Icon name="pencil" />}
          />
          <TextInput
            value={email}
            onChangeText={handleEmailChange}
            label="email"
            right={<TextInput.Icon name="email-edit" />}
          />
          <TextInput
            value={password}
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
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '4%'
  }
});

export default EditProfile;
