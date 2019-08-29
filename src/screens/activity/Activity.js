import { FlatList, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';

import PostItem from './PostItem';
import MainLayout from '../../layouts/MainLayout';
import { getFeedData, addNewPost } from '../../firebase/activity';

const Activity = ({ params }) => {
  const [feed, setFeed] = useState([]);
  const [newFeedData, setNewFeedData] = useState('');
  const textInputRef = React.useRef();
  const updateFeed = response => {
    setFeed(response);
  };

  useEffect(() => {
    getFeedData(updateFeed);
  }, []);

  const handleTextChange = text => {
    setNewFeedData(text);
  };

  const addNew = () => {
    addNewPost(newFeedData);
    textInputRef.current.clear();
  };
  const renderItem = ({ item }) => {
    return <PostItem feed={item} />;
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
          ref={textInputRef}
          mode="outlined"
          multiline
          underlineColor="transparent"
          onChangeText={handleTextChange}
          style={{ flex: 1 }}
        />
        <Button onPress={addNew}>Post</Button>
      </View>
    </MainLayout>
  );
};

export default Activity;
