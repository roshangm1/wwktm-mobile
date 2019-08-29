import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { TextInput, Button } from 'react-native-paper';
import { StyleSheet, ScrollView } from 'react-native';
import { addQuestionForTalk } from '../../firebase/question';

const AddQuestion = props => {
  const [question, setQuestion] = useState('');

  const onSubmitPress = () => {
    const { talkId } = props.navigation.state.params;
    addQuestionForTalk(talkId, question);
  };

  return (
    <MainLayout title="Add Question" icon="arrow-left">
      <ScrollView contentContainerStyle={styles.mainContainerStyle}>
        <TextInput
          label="Add a question"
          placeholder="Add a question.."
          value={question}
          onChangeText={text => setQuestion(text)}
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

export default AddQuestion;
