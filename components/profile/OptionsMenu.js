import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, Menu, Divider } from 'react-native-paper';

// opens a dropdown menu
// menu options are passed as a prop of type Array
// onClose func for closing the menu
// visible => boolean for the state of the menu
const Option = ({ option, action }) => (
  <TouchableOpacity onPress={() => action(option)}>
    <Text style={styles.text}>{option}</Text>
  </TouchableOpacity>
);
const OptionsMenu = ({ visible, options, action, onClose, title }) => {
  const [open, setMoreMenu] = useState(false);
  const closeMenu = () => setMoreMenu(false);

  if (!visible) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button color='#007bff' icon="close" onPress={onClose}></Button>
        <Text style={[styles.text, { fontWeight: 'bold' }]}> {title} </Text>
        <Menu
          visible={open}
          onDismiss={() => setMoreMenu(false)}
          anchor={
            <Button
              color='#007bff'
              icon="dots-vertical"
              onPress={() => setMoreMenu(true)}
            ></Button>
          }
        >
          <Menu.Item onPress={closeMenu} title="Reset Avatar" />
          <Divider />
          <Menu.Item onPress={closeMenu} title="Save" />
        </Menu>
      </View>

      <FlatList
        data={options}
        renderItem={({ item }) => <Option option={item} action={action} />}
        keyExtractor={(item) => item}
        horizontal={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8,
    backgroundColor: '#ffffff'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  text: {
    padding: 10
  }
});

export default OptionsMenu;
