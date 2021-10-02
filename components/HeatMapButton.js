import React from "react";
import { AntDesign } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";

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
export default function HeatMapButton(props) {
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
          <ImageBackground
            imageStyle={{ borderRadius: 5 }}
            source={require("../assets/placeholderMap.jpg")}
            resizeMode="cover"
            style={styles.image}
          >
            <Text style={styles.text}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
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
          </ImageBackground>
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
  button: {
    width: 400,
    backgroundColor: "#FFFF",
    shadowColor: "#888",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    margin: "5%",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 5,
  },

  image: {
    width: "100%",
  },
  text: {
    width: "50%",
    padding: "5%",
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 14,
    color: "#000",
  },
  containerButton: {
    padding: "5%",
    display: "flex",
    width: "100%%",
    padding: "2%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  buttonContent: {
    padding: "2%",
    backgroundColor: "#FFFF",
    shadowColor: "#888",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    borderRadius: 5,
  },
});
