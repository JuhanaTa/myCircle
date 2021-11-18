import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity
} from 'react-native';
import { AVATAR_OPTIONS } from './avatarConfig';
import OptionsMenu from './OptionsMenu';

const AvatarGenerator = ({ generateAvatar }) => {
  const [selected, setSelected] = useState({});
  const [visible, setVisible] = useState(false);

  const handleSelectedOption = (selectedMenuItem) => {
    generateAvatar({varName: selected.varName, value: selectedMenuItem});
    setVisible(!visible);
  };
  const openOptionMenu = (item) => () => {
    setSelected(item);
    setVisible(true);
  };

  const Option = ({ option }) => {
    return (
      <TouchableOpacity
        style={[
          styles.avatarOption,
          {
            backgroundColor:
              option.title === selected.title ? '#112454' : '#ffffff'
          }
        ]}
        onPress={openOptionMenu(option)}
      >
        <Text
          style={option.title === selected.title && { color: '#ffffff' }}
        >{`${option?.icon} ${option?.title}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={AVATAR_OPTIONS}
        renderItem={({ item }) => <Option option={item} />}
        keyExtractor={(item) => item.title}
        extraData={selected}
        horizontal={true}
      />
      <OptionsMenu
        visible={visible}
        options={selected.data}
        action={handleSelectedOption}
        title={selected.title}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarOption: {
    padding: 8,
    margin: 2,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8
  }
});

export default AvatarGenerator;
