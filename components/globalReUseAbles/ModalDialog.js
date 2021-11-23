import React from 'react';
import { StyleSheet } from 'react-native';
import { Portal, Dialog, Button, Divider } from 'react-native-paper';

const ModalDialog = ({
  open,
  closeDialog,
  action,
  secondaryAction,
  label,
  title,
  children
}) => {
  // Reuseable dialog for rendering other compenents as children recieved as prop.children
  return (
    <Portal theme={{ colors: { primary: '#007bff' } }}>
      <Dialog visible={open} onDismiss={closeDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Divider />
        <Dialog.Content>{children}</Dialog.Content>
        <Divider />
        <Dialog.Actions style={styles.actions}>
          {!secondaryAction && <Button icon="close" onPress={closeDialog}></Button>}
          {secondaryAction }
          {action && <Button onPress={action}>{label}</Button>}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default ModalDialog;
