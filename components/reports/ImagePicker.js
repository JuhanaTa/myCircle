import React, { useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Button, Menu, Divider } from 'react-native-paper';

const ImagePicker = ({ image, getImage, launchCamera }) => {
  const [open, setMenu] = useState(false);

  const closeMenu = () => setMenu(false);
  const openMenu = () => {
    setMenu(true);
  };
  const handleImagPicer = () => {
    getImage();
    closeMenu();
  };
  const handleCameraLaunch = () => {
    launchCamera();
    closeMenu();
  };

  const anchorEl = () => (
    <Button
      onPress={openMenu}
      icon="camera"
      accessibilityLabel="pick image from gallery or take a camera shot"
      style={styles.button}
      theme={{ colors: { primary: '#007bff' } }}
    >
      Pick Image
    </Button>
  );

  return (
    <View style={styles.imageContainer}>
      <View style={styles.imageContent}>
        <View style={styles.buttons}>
          <Menu visible={open} onDismiss={closeMenu} anchor={anchorEl()}>
            <Menu.Item
              onPress={handleImagPicer}
              title="Pick Image from Gallery"
            />
            <Divider />
            <Menu.Item onPress={handleCameraLaunch} title="Camera" />
          </Menu>
        </View>
        {image && (
          <Image
            source={{
              uri: image.uri
            }}
            style={styles.image}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  imageContent: {
    marginTop: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    alignSelf: 'center',
    height: 250,
    width: 250,
    resizeMode: 'contain',
    marginBottom: 15
  },
  buttons: {
    marginBottom: 10
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 4,
    backgroundColor: '#fff',

    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    borderRadius: 25
  }
});

export default ImagePicker;
