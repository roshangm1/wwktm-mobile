import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { getAllQuestions, upvoteAQuestion } from '../../firebase/question';
import { Card, Button } from 'react-native-paper';
import MainLayout from '../MainLayout';

const Questions = ({ params }) => {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    getAllQuestions().then(response => setQuestions(response));
  }, []);

  const upvoteQuestion = question => {
    upvoteAQuestion(question.id);
  };

  const renderItem = ({ item }) => {
    return (
      <Card>
        <Card.Content
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <View>
            <Text>{item.question}</Text>
            <Text>Upvotes: {item.upvotes}</Text>
          </View>
          <Button onPress={() => upvoteQuestion(item)}>Upvote</Button>
        </Card.Content>
      </Card>
    );
  };
  if (!questions) {
    return <Text>Loading...</Text>;
  }
  return (
    <MainLayout title="Questions" icon="menu">
      <FlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </MainLayout>
  );
};

export default Questions;
