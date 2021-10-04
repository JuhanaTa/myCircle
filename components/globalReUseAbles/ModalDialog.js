import React from "react";
import { Portal, Dialog, Button, Divider  } from "react-native-paper";

const ModalDialog = ({ open, closeDialog, action, label, title, children }) => {
  // Reuseable dialog for rendering other compenents as children recieved as prop.children
  return (
    <Portal>
      <Dialog visible={open} onDismiss={closeDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Divider/>
        <Dialog.Content>
          {children}
        </Dialog.Content>
        <Divider/>
        <Dialog.Actions>
        { action && <Button onPress={action}>{label}</Button>}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};


export default ModalDialog;
