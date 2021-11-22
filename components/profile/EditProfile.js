import React from 'react';
import { StyleSheet, ScrollView, View, TextInput } from 'react-native';
import ModalDialog from '../globalReUseAbles/ModalDialog';

const EditProfile = ({
  open,
  closeDialog,
  action,
  name,
  email,
  password,
  handleNameChange,
  handleEmailChange,
  handlePasswordChange
}) => {
  // dialog for editing user's profile

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
          <TextInput
            onChangeText={handleNameChange}
            style={styles.textInput}
            placeholder="Fullname"
            value={name}
          />
          <TextInput
            placeholder="Email"
            value={email}
            style={styles.textInput}
            theme={{ colors: { primary: '#112454' } }}
            onChangeText={handleEmailChange}
            label="email"
          />
          <TextInput
            placeholder="Password"
            value={password}
            style={styles.textInput}
            onChangeText={handleEmailChange}
            label="password"
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
    fontFamily: 'Inter_400Regular',

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
  }
});

export default EditProfile;
