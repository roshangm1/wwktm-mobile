import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import MainLayout from '../MainLayout';
import { getMyNotesFor } from './../../firebase/notes';

const ScheduleDetail = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getMyNotesFor(navigation.state.params.talkId).then(response =>
      setNotes(response),
    );
  }, [navigation.state.params.talkId]);

  const renderNote = ({ item }) => {
    return <Text>{item}</Text>;
  };
  return (
    <MainLayout title="Detail" icon="arrow-back">
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
