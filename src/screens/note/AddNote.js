import React, { useState } from 'react';
import MainLayout from '../MainLayout';
import { TextInput, Button } from 'react-native-paper';
import { addNoteForTalk } from '../../firebase/notes';
import { View, StyleSheet, ScrollView } from 'react-native';

const AddNote = props => {
  const [note, setNote] = useState('');

  const onSubmitPress = () => {
    const { talkId } = props.navigation.state.params;
    addNoteForTalk(talkId, note);
  };

  return (
    <View style={styles.rootContainerStyle}>
      <MainLayout title="Add Note" icon="arrow-back" />
      <ScrollView contentContainerStyle={styles.mainContainerStyle}>
        <TextInput
          label="Add a note"
          placeholder="Add some description.."
          value={note}
          onChangeText={text => setNote(text)}
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
    height: 250,
    paddingTop: 10,
    marginTop: 20,
  },
  buttonStyle: {
    paddingVertical: 7,
    marginTop: 20,
  },
});

export default AddNote;
