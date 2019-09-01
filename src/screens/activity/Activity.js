import { FlatList, View, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableRipple } from 'react-native-paper';

import PostItem from './PostItem';
import MainLayout from '../../layouts/MainLayout';
import { getFeedData } from '../../firebase/activity';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Activity = ({ navigation }) => {
  const [feed, setFeed] = useState([]);

  const updateFeed = response => {
    setFeed(response);
  };

  useEffect(() => {
    getFeedData(updateFeed);
  }, []);

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
          marginHorizontal: 15,
          marginVertical: 5,
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 6,
        }}
      >
        <TextInput
          placeholder="What's on your mind?"
          style={{ flex: 1, paddingVertical: 7 }}
          onFocus={() => navigation.navigate('CreatePost')}
        />
        <TouchableRipple
          style={{
            paddingHorizontal: 15,
            justifyContent: 'center',
          }}
        >
          <Icon name="camera" size={20} color="black" />
        </TouchableRipple>
      </View>
    </MainLayout>
  );
};

export default Activity;
