import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
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
      mode="outlined"
      accessibilityLabel="pick image from gallery or take a camera shot"
    >
      Pick Image
    </Button>
  );

  return (
    <View style={styles.imageContainer}>
      {image && (
        <Image
          source={{
            uri: image.uri
          }}
          style={styles.image}
        />
      )}
      <View style={styles.buttons}>
        <Menu visible={open} onDismiss={closeMenu} anchor={anchorEl()}>
          <Menu.Item
            onPress={handleImagPicer}
            title="Pick Image from Gallery"
          />
          <Divider />
          <Menu.Item onPress={handleCameraLaunch} title="camera" />
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 8,

    width: 300
  },
  image: {
    alignSelf: 'center',
    height: 250,
    width: 250,
    resizeMode: 'contain'
  },
  buttons: {
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'center'
  }
});

export default ImagePicker;
