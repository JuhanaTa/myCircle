import React from 'react';
import { View, StyleSheet } from 'react-native';

import { locationHow } from './reportConstants';
import Radiobutton from '../RadioButton/RadioButton';

const ReportLocationHow = ({ useAddress, useLocation, setUseAdress, setUseLocation }) => {
    console.log('useAddress', useAddress, 'uselocation', useLocation);
  const onRadioButtonPress = (checkedItem) => {

    if(checkedItem === 'Use location'){
        setUseLocation(true);
        setUseAdress(false);
    } else {
        setUseAdress(true);
        setUseLocation(false);
    }
  };

  return (
    <>
      {locationHow.map((text, itemIdx) => {
        let isChecked;
        const checkedItemName = locationHow[itemIdx];
        if(checkedItemName === 'Use location'){
            if(useAddress){
                isChecked = false;
            }else {
                isChecked = true;
            }
        } else {
            if(useLocation){
                isChecked = false;
            }else {
                isChecked = true;
            }
        }
        
        return (
          <View style={styles.buttonGroup} key={itemIdx}>
            <Radiobutton
              onRadioButtonPress={() => onRadioButtonPress( locationHow[itemIdx])}
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
    flexDirection: 'column'
  }
});

export default ReportLocationHow;