import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import MainLayout from '../../layouts/MainLayout';
import { Subheading } from 'react-native-paper';
import { getMyNotesFor } from './../../firebase/notes';
import NoteItem from './NoteItem';

const ScheduleNotes = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  const { talkId, title } = navigation.state.params;
  useEffect(() => {
    getMyNotesFor(talkId).then(response => setNotes(response));
  }, [talkId]);

  const renderItem = ({ item }) => {
    return <NoteItem note={item.note} date={item.date} />;
  };
  return (
    <MainLayout title="Notes" icon="arrow-left">
      <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
        <Subheading>{title}</Subheading>

        <FlatList
          data={notes}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </MainLayout>
  );
};

export default ScheduleNotes;
