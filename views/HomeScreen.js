import React from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import AppLoading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";

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
import HeatMapButton from "../components/HeatMapButton";
import FrontPageAlert from "../components/FrontPageAlert";
export default function HomeScreen({ navigation }) {
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
      <ScrollView style={styles.list}>
        <LinearGradient
          colors={["#eef4fb", "#dbe9f7"]}
          style={styles.background}
        />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.mainHeader}>Welcome!</Text>
            <Text style={styles.subHeader}>5 new events in your area</Text>
          </View>
          <HeatMapButton></HeatMapButton>
          {/*Maybe 5 newest  notifications*/}
          <View style={styles.listContainer}>
            <Text style={styles.listHeader}>Recent events</Text>

            <FrontPageAlert></FrontPageAlert>
            <FrontPageAlert></FrontPageAlert>
            <FrontPageAlert></FrontPageAlert>
            <FrontPageAlert></FrontPageAlert>
            <FrontPageAlert></FrontPageAlert>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    width: "100%",
    paddingLeft: "3%",
    paddingTop: "5%",
  },
  mainHeader: {
    color: "#112454",
    paddingLeft: "3%",
    paddingTop: "5%",
    paddingBottom: "4%",
    fontSize: 39,
    width: "100%",
    textAlign: "left",
    display: "flex",
    fontFamily: "Inter_700Bold",
  },
  subHeader: {
    paddingLeft: "4%",
    paddingBottom: "2%",
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#566787",
  },
  content: {
    backgroundColor: "#f4f6f8",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  listContainer: {
    flex: 1,
    padding: 0,
    paddingTop: "3%",
    margin: 0,
  },
  listHeader: {
    color: "#112454",
    paddingLeft: "3%",
    paddingBottom: "5%",
    fontSize: 18,
    fontFamily: "Inter_500Medium",
  },
  list: {
    flex: 1,
    width: "100%",
    padding: 0,
    margin: 0,
  },
});
