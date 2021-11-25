import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Portal,
  Dialog,
  Button,
  Divider,
  Subheading,
  ProgressBar,
} from 'react-native-paper';

const ModalDialog = ({
  open,
  closeDialog,
  action,
  secondaryAction,
  label,
  title,
  subtitle,
  progress,
  children
}) => {
  // Reuseable dialog for rendering other compenents as children recieved as prop.children
  return (
    <Portal theme={{ colors: { primary: '#007bff' } }}>
      <Dialog visible={open} onDismiss={closeDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Divider />
        <Dialog.Content>
          {subtitle && <Subheading>{subtitle}</Subheading>}
          {children}
        </Dialog.Content>
        <Divider />
        {progress > 0 && <ProgressBar progress={progress} color={'#007bff'} />}
        <Dialog.Actions style={styles.actions}>
          {!secondaryAction && (
            <Button icon="close" onPress={closeDialog}></Button>
          )}
          {secondaryAction}
          {action && (
            <Button onPress={action} icon={label === 'Next' && 'skip-next'} >
              {label !== 'Next' && label}
            </Button>
          )}
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
