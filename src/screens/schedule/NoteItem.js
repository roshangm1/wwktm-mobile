import React from 'react';
import { Text } from 'react-native';
import { Caption, Card } from 'react-native-paper';
import { getNotesTime } from './../../utils/date';

const NoteItem = ({ note, date }) => {
  return (
    <Card style={{ marginVertical: 8, marginLeft: 12 }}>
      <Card.Content>
        <Text style={{ textAlign: 'justify' }} numberOfLines={2}>
          {note}
        </Text>
        <Caption>{getNotesTime(date)}</Caption>
      </Card.Content>
    </Card>
  );
};

export default NoteItem;
