import React from "react";
import { StyleSheet, View, Button, Image } from "react-native";
import useCamera from "../../hooks/useCamera";

const ImagePicker = ({  }) => {
  const { image, video, getImage, launchCamera } = useCamera();
  return (
      <View style={styles.imageContainer}>
        {image && (
          <Image
            source={{
              uri: image.uri,
            }}
            style={styles.image}
          />
        )}
        <View style={styles.buttons}>
          <Button
            onPress={getImage}
            title="Pick Image"
            accessibilityLabel="pick image from gallery or take a camera shot"
          />
          <Button
            onPress={launchCamera}
            title="Take Photo"
            accessibilityLabel="Take a photo shot from your camera"
          />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 8,

    width: 300,
  },
  image: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    resizeMode: "contain",
  },
  buttons: {
    flexDirection: "row",
    padding: 4,
    justifyContent: "space-between",
  },
});

export default ImagePicker;