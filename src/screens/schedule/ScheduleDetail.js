import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import MainLayout from '../../layouts/MainLayout';
import { getMyNotesFor } from './../../firebase/notes';
import { Button } from 'react-native-paper';

const ScheduleDetail = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const talkId = navigation.state.params.schedule.id;

  useEffect(() => {
    getMyNotesFor(talkId).then(response => setNotes(response));
  }, [talkId]);

  const navigateToAddQuestion = () => {
    navigation.navigate('AddQuestion', {
      talkId: navigation.state.params.schedule.id,
    });
  };
  const renderNote = ({ item }) => {
    return <Text>{item.note}</Text>;
  };
  return (
    <MainLayout title="Detail" icon="arrow-left">
      <Button onPress={navigateToAddQuestion}>Add Question</Button>
      <View style={{ padding: 16 }}>
        <Text>Notes</Text>
        <FlatList
          data={notes}
          renderItem={renderNote}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </MainLayout>
  );
};

export default ScheduleDetail;
