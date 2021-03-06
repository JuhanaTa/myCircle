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

const AvatarGenerator = ({
  generateAvatar,
  generateRandomAvatar,
  resetAvatar,
  saveAvatarToDb,
  setVisible,
  visible,
  isAvatarSystemOpened
}) => {
  const [selected, setSelected] = useState({ ...AVATAR_OPTIONS[0] });
  const [highlighted, setHighlighted] = useState({ ...AVATAR_OPTIONS[0] });

  if (!isAvatarSystemOpened) return null;

  const handleSelectedOption = (selectedMenuItem) => {
    generateAvatar({ varName: selected.varName, value: selectedMenuItem });
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
        generateRandomAvatar={generateRandomAvatar}
        onClose={closeOptionMenu}
        reset={resetAvatar}
        save={saveAvatarToDb}
        title={selected.title}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarOption: {
    padding: 8,
    margin: 2,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    height: 40
  }
});

export default AvatarGenerator;
