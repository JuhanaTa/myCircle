import React from "react";
import { Portal, Dialog, Button, Divider  } from "react-native-paper";

const ModalDialog = ({ open, closeDialog, label, children }) => {
  // Reuseable dialog for rendering other compenents as children recieved as prop.children
  return (
    <Portal>
      <Dialog visible={open} onDismiss={closeDialog}>
        <Dialog.Title>Choose a Topic</Dialog.Title>
        <Divider/>
        <Dialog.Content>
          {children}
        </Dialog.Content>
        <Divider/>
        <Dialog.Actions>
          <Button onPress={closeDialog}>{label}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};


export default ModalDialog;
