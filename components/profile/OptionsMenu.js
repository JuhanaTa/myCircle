import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native';

// opens a dropdown menu
// menu options are passed as a prop of type Array
// onClose func for closing the menu
// visible => boolean for the state of the menu
const Option = ({ option, action }) => (
  <TouchableOpacity onPress={action}>
    <Text style={styles.text}>{option}</Text>
  </TouchableOpacity>
);
const OptionsMenu = ({ visible, onClose, options, action, title }) => {
  if (!visible) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.text, { fontWeight: 'bold' }]}> {title} </Text>
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
    backgroundColor: '#ffffff',
  },
  text: {
    padding: 10,
  },
});

export default OptionsMenu;
