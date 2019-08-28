import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-paper';

const FeedItem = ({ feed }) => (
  <Card style={{ marginBottom: 8 }}>
    <Card.Content>
      <Text>{feed.name}</Text>
      <Text>{feed.content}</Text>
    </Card.Content>
  </Card>
);

export default FeedItem;
