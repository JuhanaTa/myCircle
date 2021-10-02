import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function HeatMapButton(props) {
  const { onPress, title = "Save" } = props;
  return (
    <Pressable style={styles.button}>
      <Text style={styles.text}>halloo</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,

    letterSpacing: 0.25,
    color: "#000",
  },
});
