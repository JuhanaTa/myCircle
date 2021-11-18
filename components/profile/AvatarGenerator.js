import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { SvgUri, SvgCssUri } from 'react-native-svg';
import getAvatarUri, { AVATAR_OPTIONS, MOUTH } from './avatarConfig';
import OptionsMenu from './OptionsMenu';

const AvatarGenerator = () => {
  const [selected, setSelected] = useState({});
  const [visible, setVisible] = useState(false);

  const handleSelectedOption = () => setVisible(!visible);
  const openOptionMenu = (item) => () => {
    setSelected(item);
    setVisible(true);
  };

  console.log('selected', selected);
  

  const Option = ({ option }) => {
    return (
      <TouchableOpacity style={styles.avatarOption} onPress={openOptionMenu(option)}>
        <Text>{`${option?.icon} ${option?.option}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={AVATAR_OPTIONS}
        renderItem={({ item }) => <Option option={item} />}
        keyExtractor={(item) => item.option}
        horizontal={true}
      />
      <OptionsMenu
        visible={visible}
        options={selected.data}
        action={handleSelectedOption}
        title={selected.option}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarOption: {
    backgroundColor: '#ffffff',

    padding: 8,
    margin: 2,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8
  }
});

export default AvatarGenerator;
