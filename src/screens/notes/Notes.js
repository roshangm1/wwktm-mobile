import { SectionList, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import MainLayout from '../../layouts/MainLayout';
import { getAllNotes } from '../../firebase/notes';
import NoteItem from '../schedule/NoteItem';
import NoteHeader from './NoteHeader';

const Notes = ({ params }) => {
  const [notes, setNotes] = useState([]);
  const [categorizedNotes, setCategorizedNotes] = useState([]);

  const updateNotes = response => {
    setNotes(response);
  };

  useEffect(() => {
    getAllNotes(updateNotes);
  }, []);

  useEffect(() => {
    const notesData = prepareData();
    const sectionListData = Object.keys(notesData).map(key => {
      return { title: key, data: notesData[key] };
    });
    setCategorizedNotes(sectionListData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

  const prepareData = () => {
    return notes.reduce((acc, obj) => {
      (acc[obj.talkId] = acc[obj.talkId] || []).push(obj);

      return acc;
    }, {});
  };
  const renderItem = ({ item, index, section }) => {
    return <NoteItem key={index} note={item.note} date={item.date} />;
  };
  return (
    <MainLayout title="Notes">
      <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}>
        <SectionList
          sections={categorizedNotes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <NoteHeader talkId={title} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </MainLayout>
  );
};

export default Notes;
