import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {  RadioButton } from "react-native-paper";
import ModalDialog from "../globalReUseAbles/ModalDialog";
import { reportTopics } from "./reportConstants";

const ReportTopics = ({ open, closeDialog, checked, setChecked }) => {
  // renders the report topics for user to choose from
  return (
    <ModalDialog open={open} closeDialog={closeDialog} label="ok">
      {reportTopics.map((topic) => (
        <View style={styles.radio} key={topic}>
          <RadioButton
            value={topic}
            status={checked === topic ? "checked" : "unchecked"}
            onPress={() => setChecked(topic)}
          />
          <Text style={styles.text}> {topic} </Text>
        </View>
      ))}
    </ModalDialog>
  );
};

const styles = StyleSheet.create({
  radio: {
    flexDirection: "row",
  },
  text: {
    alignSelf: "center",
  },
});

export default ReportTopics;
