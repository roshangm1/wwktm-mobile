import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-paper';

const PostItem = ({ feed }) => (
  <Card style={{ margin: 8 }}>
    <Card.Content>
      <Text style={{ fontWeight: 'bold' }}>{feed.name}</Text>
      <Text>{feed.content}</Text>
    </Card.Content>
  </Card>
);

export default PostItem;
