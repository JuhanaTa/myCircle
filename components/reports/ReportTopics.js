import React from 'react';
import { View, StyleSheet } from 'react-native';

import { reportTopics } from './reportConstants';
import Radiobutton from '../RadioButton/RadioButton';

const ReportTopics = ({ checked, setChecked }) => {
  // renders the report topics for user to choose from
  console.log('checked topic in report topics', checked);
  const onRadioButtonPress = (checkedItem) => {
    setChecked(checkedItem);
  };

  return (
    <>
      {reportTopics.map((text, itemIdx) => {
        let isChecked = checked === text ? true : false;
        return (
          <View style={styles.buttonGroup} key={itemIdx}>
            <Radiobutton
              onRadioButtonPress={() => onRadioButtonPress( reportTopics[itemIdx])}
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
