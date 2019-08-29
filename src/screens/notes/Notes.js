import { FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

import NoteItem from './NoteItem';
import MainLayout from '../../layouts/MainLayout';
import { getAllNotes } from '../../firebase/notes';

const Notes = ({ params }) => {
  const [notes, setNotes] = useState(null);

  const updateNotes = response => {
    setNotes(response);
  };

  useEffect(() => {
    getAllNotes(updateNotes);
  }, []);

  const renderItem = ({ item }) => {
    return <NoteItem note={item} />;
  };
  return (
    <MainLayout title="Notes">
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </MainLayout>
  );
};

export default Notes;
