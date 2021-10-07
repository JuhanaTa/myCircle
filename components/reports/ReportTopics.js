import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import ModalDialog from '../globalReUseAbles/ModalDialog';
import { reportTopics } from './reportConstants';

const ReportTopics = ({ checked, setChecked }) => {
  // renders the report topics for user to choose from
  return (
    <RadioButton.Group
      onValueChange={(newValue) => {
        setChecked(newValue);
        console.log(newValue);
      }}
      value={checked}
    >
      <View style={styles.radioGroup}>
        {reportTopics.map((topic) => (
          <View style={styles.radio} key={topic}>
            <Text>{topic}</Text>
            <RadioButton
              style={styles.button}
              value={topic}
              status={checked === topic ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(topic);
              }}
            />
          </View>
        ))}
      </View>
    </RadioButton.Group>
  );
};

const styles = StyleSheet.create({
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  radio: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%'
  },
  button: { borderWidth: 1 },
  text: {
    alignSelf: 'center'
  }
});

export default ReportTopics;
