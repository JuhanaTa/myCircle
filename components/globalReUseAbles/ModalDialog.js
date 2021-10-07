import React from 'react';
import { StyleSheet } from 'react-native';
import { Portal, Dialog, Button, Divider } from 'react-native-paper';

const ModalDialog = ({ open, closeDialog, action, label, title, children }) => {
  // Reuseable dialog for rendering other compenents as children recieved as prop.children
  return (
    <Portal >
      <Dialog visible={open} onDismiss={closeDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Divider />
        <Dialog.Content>{children}</Dialog.Content>
        <Divider />
        <Dialog.Actions>
          {action && <Button onPress={action}>{label}</Button>}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '80%',
    marginRight: '10%',
    marginLeft: '0%'
  },
});

export default ModalDialog;
