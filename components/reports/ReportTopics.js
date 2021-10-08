import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import ModalDialog from '../globalReUseAbles/ModalDialog';
import { reportTopics } from './reportConstants';
import Radiobutton from '../RadioButton/RadioButton';

const ReportTopics = ({ checked, setChecked }) => {
  // renders the report topics for user to choose from

  const onRadioButtonPress = (itemIdx) => {
    setChecked(itemIdx);
  };

  return (
    <>
      {reportTopics.map((text, itemIdx) => {
        let isChecked = checked === itemIdx ? true : false;
        return (
          <View style={styles.buttonGroup} key={itemIdx}>
            <Radiobutton
              onRadioButtonPress={() => onRadioButtonPress(itemIdx)}
              isChecked={isChecked}
              text={text}
            />
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  radioGroup: {
    width: 100,
    flex: 1,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});

export default ReportTopics;
