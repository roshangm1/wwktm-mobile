import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { TextInput, Button } from 'react-native-paper';
import { addNoteForTalk } from '../../firebase/notes';
import { StyleSheet, ScrollView } from 'react-native';

const AddNote = props => {
  const [note, setNote] = useState('');

  const onSubmitPress = () => {
    const { talkId } = props.navigation.state.params;
    addNoteForTalk(talkId, note).then(() => {
      props.navigation.navigate('Notes');
    });
  };

  return (
    <MainLayout title="Add Note" icon="arrow-left">
      <ScrollView contentContainerStyle={styles.mainContainerStyle}>
        <TextInput
          label="Add a note"
          placeholder="Add some description.."
          value={note}
          onChangeText={text => setNote(text)}
          mode="outlined"
          multiline
          style={styles.inputTextStyle}
        />
        <Button
          mode="contained"
          style={styles.buttonStyle}
          onPress={onSubmitPress}
        >
          Submit
        </Button>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  rootContainerStyle: {
    flex: 1,
  },
  mainContainerStyle: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  inputTextStyle: {},
  buttonStyle: {
    paddingVertical: 7,
    marginTop: 20,
  },
});

export default AddNote;
