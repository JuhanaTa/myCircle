import React from "react";
import { AntDesign } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  StyleSheet,
  Pressable,
  Button,
  Alert,
  View,
  ImageBackground,
  Image,
} from "react-native";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
  OpenSans_800ExtraBold_Italic,
} from "@expo-google-fonts/open-sans";
const image = { uri: "https://reactjs.org/logo-og.png" };
export default function FrontPageAlert(props) {
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Pressable style={styles.button}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/placeholderMap.jpg")}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </Text>
            <View style={styles.containerButton}>
              <View style={styles.buttonContent}>
                <AntDesign
                  style={styles.buttonArrow}
                  name="right"
                  size={20}
                  color="#dc0368"
                />
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  imageContainer: {
    flex: 1.5,
    height: "100%",
    padding: "4%",
    borderRadius: 5,
  },
  image: {
    flex: 1.5,
    height: "100%",
    width: "100%",
    borderRadius: 5,
  },
  content: {
    width: "100%",
    flex: 2,
    display: "flex",
    flexDirection: "column",
  },
  button: {
    width: 400,
    backgroundColor: "#FFFF",
    shadowColor: "#888",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    margin: "5%",
    padding: "1%",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 5,
  },

  text: {
    display: "flex",
    padding: "5%",
    fontFamily: "OpenSans_400Regular",
    fontSize: 12,
    color: "#000",
  },
  containerButton: {
    padding: "5%",
    display: "flex",
    width: "100%",

    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  buttonContent: {
    padding: "4%",
    backgroundColor: "#FFFF",
    shadowColor: "#888",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    borderRadius: 5,
  },
  background: {
    borderRadius: 5,
  },
});
