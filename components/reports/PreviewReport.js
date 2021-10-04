import React from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { Paragraph, Subheading, Title } from 'react-native-paper';
import ModalDialog from '../globalReUseAbles/ModalDialog';

const PreviewReport = ({
  open,
  closeDialog,
  action,
  topic,
  image,
  description
}) => {
  // preview new report before sending to server
  return (
    <ModalDialog
      open={open}
      closeDialog={closeDialog}
      action={action}
      label="Send"
      title=" Report Preview"
    >
      <ScrollView style={styles.container}>
        <Title style={styles.text}> {topic} </Title>
        <Subheading style={styles.text}> Content </Subheading>
        <Paragraph style={styles.text}> {description} </Paragraph>
        {image && <Image source={{ uri: image.uri }} style={styles.image} />}
      </ScrollView>
    </ModalDialog>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300
  },
  text: {
    padding: 10
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: 'contain'
  }
});

export default PreviewReport;
