import { Card, Button } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';

import { auth } from '../../firebase';
import MainLayout from '../../layouts/MainLayout';
import { getAllQuestions, upvoteAQuestion } from '../../firebase/question';

const Questions = ({ params }) => {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    getAllQuestions(response => setQuestions(response));
  }, []);

  const upvoteQuestion = question => {
    upvoteAQuestion(question);
  };

  const renderItem = ({ item }) => {
    const user = auth().currentUser;

    return (
      <Card elevation={2}>
        <Card.Content
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <View>
            <Text>{item.question}</Text>
            <Text>Upvotes: {item.upvotes}</Text>
          </View>
          <Button onPress={() => upvoteQuestion(item)}>
            {item.voters.includes(user.uid) ? 'DownVote' : 'Upvote'}
          </Button>
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
