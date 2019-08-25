import React, { useState } from 'react';
import MainLayout from './../MainLayout';
import { TextInput, Button } from 'react-native-paper';
import { addNoteForTalk } from './../../firebase/notes';
import { View, StyleSheet, ScrollView } from 'react-native';

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [description, setDescrition] = useState('');

  const enterDescription = React.createRef();

  const onSubmitPress = () => {
    addNoteForTalk();
  };

  return (
    <View style={styles.rootContainerStyle}>
      <MainLayout title="Add Note" icon="arrow-back" />
      <ScrollView contentContainerStyle={styles.mainContainerStyle}>
        <TextInput
          label="Note title"
          placeholder="Add title to your note"
          value={title}
          onChangeText={() => setTitle(title)}
          mode="outlined"
          onSubmitEditing={() => enterDescription.current.focus()}
        />
        <TextInput
          label="Note description"
          placeholder="Add some description.."
          ref={enterDescription}
          value={description}
          onChangeText={() => setDescrition(description)}
          mode="outlined"
          multiline
          style={styles.descriptionTextStyle}
        />
        <Button
          mode="contained"
          style={styles.buttonStyle}
          onPress={onSubmitPress}
        >
          Submit
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainerStyle: {
    flex: 1,
  },
  mainContainerStyle: {
    flex: 1,
    padding: 15,
  },
  descriptionTextStyle: {
    height: 150,
    paddingTop: 10,
    marginTop: 40,
  },
  buttonStyle: {
    paddingVertical: 7,
    marginTop: 20,
  },
});

export default AddNote;
