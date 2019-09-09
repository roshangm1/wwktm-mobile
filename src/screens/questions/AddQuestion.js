import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { TextInput, Button, Switch } from 'react-native-paper';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { addQuestionForTalk } from '../../firebase/question';
import Colors from '../../configs/colors';
import Row from '../../components/Row';

const AddQuestion = ({ navigation }) => {
  const [question, setQuestion] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const onSubmitPress = () => {
    const { talkId } = navigation.state.params;
    addQuestionForTalk(talkId, question, anonymous).then(() =>
      navigation.goBack(),
    );
  };

  return (
    <MainLayout title="Add Question" icon="arrow-left">
      <ScrollView contentContainerStyle={styles.mainContainerStyle}>
        <TextInput
          placeholder="Add a question.."
          value={question}
          onChangeText={text => setQuestion(text)}
          mode="outlined"
          multiline
          height={200}
          style={styles.descriptionTextStyle}
        />
        <Row
          style={{
            justifyContent: 'space-between',
            padding: 8,
          }}
        >
          <Text>Ask anonymously</Text>
          <Switch
            value={anonymous}
            color={Colors.primary}
            onValueChange={() => {
              setAnonymous(prevState => !prevState);
            }}
          />
        </Row>
        <Button
          mode="contained"
          dark
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
  descriptionTextStyle: {},
  buttonStyle: {
    paddingVertical: 7,
    marginTop: 20,
  },
});

export default AddQuestion;
