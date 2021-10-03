import { useState, useEffect } from "react";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

const useCamera = () => {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need access to your media files");
        }
      }
    })();
  }, []);

  const setMedia = (result) => {
    if (!result.cancelled) {
      result.type === "image" && setImage(result);
      result.type === "video" && setVideo(result);
    }
  };

  const getImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
    console.log(result);

    setMedia(result);
  };

  const launchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
    });
    console.log(result);

    setMedia(result);
  };

  return { image, video, getImage, launchCamera };
};

export default useCamera;
