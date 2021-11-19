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

const AvatarGenerator = ({ generateAvatar, resetAvatar, saveAvatarToDb, setVisible, visible }) => {
  const [selected, setSelected] = useState({});
  const [highlighted, setHighlighted] = useState({});

  const handleSelectedOption = (selectedMenuItem) => {
    generateAvatar({varName: selected.varName, value: selectedMenuItem});
  };
  const openOptionMenu = (item) => () => {
    setSelected(item);
    setHighlighted(item);
    setVisible(true);
  };
  const closeOptionMenu = () => {
    setVisible(!visible);
    setHighlighted({});
  };

  const Option = ({ option }) => {
    return (
      <TouchableOpacity
        style={[
          styles.avatarOption,
          {
            backgroundColor:
              option.title === highlighted.title ? '#112454' : '#ffffff'
          }
        ]}
        onPress={openOptionMenu(option)}
      >
        <Text
          style={option.title === highlighted.title && { color: '#ffffff' }}
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
        extraData={highlighted}
        horizontal={true}
      />
      <OptionsMenu
        visible={visible}
        options={selected.data}
        action={handleSelectedOption}
        onClose={closeOptionMenu}
        reset={resetAvatar}
        save ={saveAvatarToDb}
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
