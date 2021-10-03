import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Portal, Dialog, Button, RadioButton,  } from "react-native-paper";
import { reportTopics } from "./reportConstants";

const ReportTopicDialog = ({ open, closeDialog, checked, setChecked }) => {
  return (
    <Portal>
      <Dialog visible={open} onDismiss={closeDialog}>
        <Dialog.Title>Choose a Topic</Dialog.Title>
        <Dialog.Content>
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
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={closeDialog}>ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  radio: {
    flexDirection: "row",
  },
  text: {
    alignSelf: 'center'
  }
});

export default ReportTopicDialog;
