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
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
const image = { uri: "https://reactjs.org/logo-og.png" };
export default function HeatMapButton(props) {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Pressable style={styles.button}>
          <ImageBackground
            imageStyle={{ borderRadius: 25 }}
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
                  size={18}
                  color="#007bff"
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
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  button: {
    width: 380,
    backgroundColor: "#FFFF",

    margin: "5%",

    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 25,
  },

  image: {
    width: "100%",
  },
  text: {
    width: "50%",
    padding: "5%",
    paddingLeft: "4%",
    paddingBottom: "2%",
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: "#112454",
  },
  containerButton: {
    padding: "5%",
    display: "flex",
    width: "100%%",
    padding: "2%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderRadius: 25,
  },
  buttonContent: {
    padding: "3%",
    backgroundColor: "#fff",
    shadowColor: "#888",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    borderRadius: 25,
  },
  background: {
    padding: "1%",
    borderRadius: 25,
  },
});
