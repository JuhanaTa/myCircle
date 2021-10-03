import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { TextInput } from "react-native-paper";
import ImagePicker from "../components/reports/ImagePicker";
import ReportTopicDialog from "../components/reports/ReportTopicsDialog";

const NewReport = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [open, setDialog] = useState(false);
  const [checkedTopic, setCheckedTopic] = useState();
  console.log('checked', checkedTopic);
  
  const openDialog = () => setDialog(true);
  const closeDialog = () => setDialog(false);
  const handleChecked = (topic) => setCheckedTopic(topic);
  return (
    <View style={styles.container}>
      <Button
        onPress={openDialog}
        title="choose report topic"
        accessibilityLabel="select a topic to report"
      />
      <ReportTopicDialog
        open={open}
        closeDialog={closeDialog}
        checked={checkedTopic}
        setChecked={handleChecked}
      />
      <View style={styles.description}>
        <TextInput
          placeholder="Description of the issue"
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          mode="outlined"
          label="description"
          numberOfLines={4}
        ></TextInput>
      </View>
      <ImagePicker />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    width: 300,
    maxHeight: 200,
  },
});

export default NewReport;
