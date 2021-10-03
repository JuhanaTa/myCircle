import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { TextInput } from "react-native-paper";
import ImagePicker from "../components/reports/ImagePicker";

const NewReport = ({ navigation }) => {
  const [description, setDescription] = useState("");
  return (
    <View style={styles.container}>
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
      <ImagePicker/>
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
