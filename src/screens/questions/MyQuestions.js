import React, { useEffect, useState } from 'react';
import { Text, FlatList } from 'react-native';
import { getMyQuestions } from '../../firebase/question';
import { Card } from 'react-native-paper';
import MainLayout from '../../layouts/MainLayout';

const MyQuestions = ({ params }) => {
  const [myQuestions, setMyQuestions] = useState(null);

  useEffect(() => {
    getMyQuestions().then(questions => setMyQuestions(questions));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Card>
        <Card.Content>{item.question}</Card.Content>
      </Card>
    );
  };
  if (!myQuestions) {
    return <Text>Loading...</Text>;
  }
  return (
    <MainLayout title="My Questions" icon="menu">
      <FlatList
        data={myQuestions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </MainLayout>
  );
};

export default MyQuestions;
