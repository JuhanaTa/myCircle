import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, Menu, Divider, Snackbar } from 'react-native-paper';

// opens a dropdown menu
// menu options are passed as a prop of type Array
// onClose func for closing the menu
// visible => boolean for the state of the menu
const Option = ({ option, action }) => (
  <TouchableOpacity
    onPress={() => action(option)}
    style={{
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
      height: 45,
      padding: 1,
      margin: 3,
      borderTopEndRadius: 8,
      borderTopStartRadius: 8,
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8
    }}
  >
    <Text style={styles.text}>{option}</Text>
  </TouchableOpacity>
);
const OptionsMenu = ({
  visible,
  options,
  action,
  onClose,
  save,
  reset,
  title,
  generateRandomAvatar
}) => {
  const [open, setMoreMenu] = useState(false);
  const [isSnackbarOpened, setSnackbar] = useState(false);
  const closeMenu = () => setMoreMenu(false);

  const handleSave = () => {
    closeMenu();
    save();
    onClose();
  };
  const handleReset = () => {
    closeMenu();
    reset();
  };

  const handleclose = () => {
    setSnackbar(true);
  };
  const closeSnackbar = () => {
    setMoreMenu(true);
    setSnackbar(false);
  };

  if (!visible) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Snackbar
        style={[styles.Snackbar, { backgroundColor: '#112454' }]}
        visible={isSnackbarOpened}
        onDismiss={closeSnackbar}
        duration={3000}
      >
        You&#39;ll lose your changes, modifications to avatar not saved!
      </Snackbar>

      <View style={styles.header}>
        <Button color="#007bff" icon="close" onPress={handleclose}></Button>
        <Text style={[styles.text, { fontWeight: 'bold' }]}> {title} </Text>
        <Button
          color="#007bff"
          icon="shuffle-variant"
          onPress={generateRandomAvatar}
        >
          Random
        </Button>
        <Menu
          visible={open}
          onDismiss={() => setMoreMenu(false)}
          anchor={
            <Button
              color="#007bff"
              icon="dots-vertical"
              onPress={() => setMoreMenu(true)}
            ></Button>
          }
        >
          <Menu.Item onPress={handleSave} title="Save" />
          <Divider />
          <Menu.Item onPress={handleReset} title="Reset Avatar" />
          <Divider />
          <Menu.Item onPress={onClose} title="Cancel" />
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
    backgroundColor: '#FFF',
    flexDirection: 'column',
    borderRadius: 25,
    elevation: 10,
    shadowColor: '#000',
    paddingBottom: 8,
    paddingLeft: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8
  },
  text: {
    padding: 10
  },
  Snackbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8
  }
});

export default OptionsMenu;
