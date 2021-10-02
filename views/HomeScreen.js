import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import AppLoading from "expo-app-loading";
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
import HeatMapButton from "../components/HeatMapButton";

export default function HomeScreen({ navigation }) {
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
        <HeatMapButton></HeatMapButton>
        <Text style={styles.content}>HomeScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#f4f6f8",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: "10% 5%",
  },
  content: {
    color: "red",
    fontFamily: "OpenSans_400Regular",
  },
});
