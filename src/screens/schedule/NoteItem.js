import React from 'react';
import { Text } from 'react-native';
import { Caption, Card } from 'react-native-paper';
import { getNotesTime } from './../../utils/date';

const NoteItem = ({ note, date }) => {
  return (
    <Card elevation={2} style={{ marginVertical: 8 }}>
      <Card.Content style={{ flex: 1 }}>
        <Text style={{ textAlign: 'justify' }} numberOfLines={2}>
          {note}
        </Text>
        <Caption>{getNotesTime(date)}</Caption>
      </Card.Content>
    </Card>
  );
};

export default NoteItem;
