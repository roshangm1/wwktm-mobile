import { FlatList, TextInput, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableRipple } from 'react-native-paper';

import PostItem from './PostItem';
import MainLayout from '../../layouts/MainLayout';
import { getFeedData, upvoteFeed } from '../../firebase/activity';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../configs/colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Spinner from '../../components/Spinner';
import EmptyComponent from './../../components/EmptyComponent';

const Activity = ({ navigation }) => {
  const [feed, setFeed] = useState(null);

  const updateFeed = response => {
    setFeed(response);
  };

  const likePost = post => {
    upvoteFeed(post);
  };
  const navigateToPostDetail = post => {
    navigation.navigate('PostDetail', { post });
  };

  useEffect(() => {
    getFeedData(updateFeed);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <PostItem
        post={item}
        onPress={() => navigateToPostDetail(item)}
        onLikePress={() => likePost(item)}
        onCommentPress={() => navigateToPostDetail(item)}
      />
    );
  };

  if (!feed) {
    return (
      <MainLayout title="Activity">
        <Spinner />
      </MainLayout>
    );
  } else if (feed.length === 0) {
    <EmptyComponent />;
  }
  return (
    <MainLayout title="Activity">
      <FlatList
        data={feed}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('CreatePost')}
        style={styles.inputTextContainer}
      >
        <TextInput
          placeholder="What's on your mind?"
          style={styles.inputText}
          onFocus={() => navigation.navigate('CreatePost')}
        />
        <TouchableRipple style={styles.iconStyle}>
          <Icon name="camera" size={20} color={Colors.black} />
        </TouchableRipple>
      </TouchableWithoutFeedback>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  inputTextContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    borderColor: Colors.grey,
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
  },
  inputText: {
    flex: 1,
    paddingVertical: 8,
  },
  iconStyle: {
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
});
export default Activity;
