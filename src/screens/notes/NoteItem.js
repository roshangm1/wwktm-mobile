import { Text } from 'react-native';
import { Card } from 'react-native-paper';
import React, { useEffect, useState } from 'react';

import { getTalkDetail } from '../../firebase/schedule';

const NoteItem = ({ note }) => {
  const [talkTitle, setTalkTitle] = useState('Loading...');
  useEffect(() => {
    getTalkDetail(note.talkId).then(response => {
      setTalkTitle(response.title);
    });
  }, [note]);
  return (
    <Card elevation={2} style={{ margin: 8 }}>
      <Card.Content>
        <Text style={{ fontWeight: 'bold' }}>{note.note}</Text>
        <Text style={{ fontStyle: 'italic' }}>{talkTitle}</Text>
      </Card.Content>
    </Card>
  );
};
export default NoteItem;
