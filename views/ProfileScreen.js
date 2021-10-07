import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import UserAvatar from '../components/profile/UserAvatar';
import useCamera from '../hooks/useCamera';
import { List } from 'react-native-paper';

const ProfileScreen = ({ navigation }) => {
  const { image, getImage, launchCamera } = useCamera({ aspect: [4, 3] });
  const [isExpanded, setAccordion] = useState(false);
  const openAccordion = () => setAccordion(true);
  return (
    <View style={styles.container}>
      <UserAvatar image={image} />
      <List.Section>
      <List.Accordion
        title="Personal Data"
        left={props => <List.Icon {...props} icon="account" />}
        expanded={isExpanded}
        onPress={openAccordion}>
        <List.Item title="@username" />
        <List.Item title="first.last@me.fi" />
      </List.Accordion>
      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={isExpanded}
        onPress={openAccordion}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={isExpanded}
        onPress={openAccordion}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default ProfileScreen;
