import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { getQuestionsForTalk } from '../../firebase/question';
import MainLayout from '../../layouts/MainLayout';
import QuestionItem from './QuestionItem';
import Spinner from '../../components/Spinner';
import { getScheduleConfig } from '../../firebase/config';
import { getTalkDetail } from '../../firebase/schedule';
import { Subheading } from 'react-native-paper';

const Questions = ({ params }) => {
  const [questions, setQuestions] = useState(null);
  const [talkDetail, setTalkDetail] = useState({});

  const getQuestionsForCurrentTalk = async () => {
    const scheduleConfig = await getScheduleConfig();
    const talk = await getTalkDetail(scheduleConfig.currentTalkId);
    setTalkDetail(talk);
    getQuestionsForTalk(scheduleConfig.currentTalkId, response =>
      setQuestions(response),
    );
  };
  useEffect(() => {
    getQuestionsForCurrentTalk();
  }, []);

  const renderItem = ({ item }) => {
    return <QuestionItem item={item} />;
  };

  if (!questions) {
    return (
      <MainLayout title="Questions">
        <Spinner />
      </MainLayout>
    );
  }
  return (
    <MainLayout title="Questions">
      <View style={{ padding: 16 }}>
        <Subheading>{talkDetail.title}</Subheading>
        <FlatList
          data={questions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </MainLayout>
  );
};

export default Questions;
