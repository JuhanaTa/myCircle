import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// custom hook for picking image and accessing user's camera
const useCamera = ({ aspect }) => {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    (async () => {
      // request the necessary permissions for camera and media files access
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need access to your media files');
        }
      }
    })();
  }, []);

  const setMedia = (result) => {
    if (!result.cancelled) {
      result.type === 'image' && setImage(result);
      result.type === 'video' && setVideo(result);
    }
  };
  // editing is set if the aspect(aspect ratio) prop is passed to hook
  const editOptions = aspect ? { allowsEditing: true, aspect, quality: 1 } : null;

  const getImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      ...editOptions,
    });
    console.log(result);

    setMedia(result);
  };

  const launchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      ...editOptions,
      base64: true,
    
    });
    console.log(result);

    setMedia(result);
  };

  return { image, video, getImage, launchCamera, setImage };
};

export default useCamera;
