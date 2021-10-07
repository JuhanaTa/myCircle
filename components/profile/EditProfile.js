import React from 'react';
import { StyleSheet,  ScrollView, View } from 'react-native';
import { TextInput } from 'react-native-paper';
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
  handlePasswordChange

}) => {
  // dialog for editing user's profile 
  return (
    <ModalDialog
      open={open}
      closeDialog={closeDialog}
      action={action}
      label="Save"
      title="Edit Your Profile"
    >
      <ScrollView >
        <View style={styles.container}> 
           <View style={styles.avatar}><UserAvatar image={image} size={110} /></View>
        
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
  container: {
   
  },
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