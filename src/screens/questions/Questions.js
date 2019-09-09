import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { getAllQuestions } from '../../firebase/question';
import MainLayout from '../../layouts/MainLayout';
import QuestionItem from './QuestionItem';

const Questions = ({ params }) => {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    getAllQuestions(response => setQuestions(response));
  }, []);

  const renderItem = ({ item }) => {
    return <QuestionItem item={item} />;
  };

  if (!questions) {
    return (
      <MainLayout title="Questions" icon="menu">
        <Text>Loading...</Text>
      </MainLayout>
    );
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
