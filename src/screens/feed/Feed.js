import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { getFeedData, addNewPost } from '../../firebase/feed';
import FeedItem from './FeedItem';
import MainLayout from '../../layouts/MainLayout';
import { Button } from 'react-native-paper';

const Feed = ({ params }) => {
  const [feed, setFeed] = useState([]);
  const updateFeed = response => {
    setFeed(response);
  };

  useEffect(() => {
    getFeedData(updateFeed);
  }, []);

  const renderItem = ({ item }) => {
    return <FeedItem feed={item} />;
  };
  return (
    <MainLayout title="Feed">
      <Button onPress={() => addNewPost('Hello new post' + Math.random())}>
        Add new post
      </Button>
      <FlatList
        data={feed}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </MainLayout>
  );
};

export default Feed;
