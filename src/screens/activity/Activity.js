import { FlatList, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';

import FeedItem from './FeedItem';
import MainLayout from '../../layouts/MainLayout';
import { getFeedData, addNewPost } from '../../firebase/feed';

const Activity = ({ params }) => {
  const [feed, setFeed] = useState([]);
  const [newFeedData, setNewFeedData] = useState('');
  const updateFeed = response => {
    setFeed(response);
  };

  useEffect(() => {
    getFeedData(updateFeed);
  }, []);

  const handleTextChange = text => {
    setNewFeedData(text);
  };

  const renderItem = ({ item }) => {
    return <FeedItem feed={item} />;
  };
  return (
    <MainLayout title="Activity">
      <FlatList
        data={feed}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 8,
          alignItems: 'center',
        }}
      >
        <TextInput
          mode="outlined"
          multiline
          underlineColor="transparent"
          onChangeText={handleTextChange}
          style={{ flex: 1 }}
        />
        <Button onPress={() => addNewPost(newFeedData)}>Post</Button>
      </View>
    </MainLayout>
  );
};

export default Activity;
