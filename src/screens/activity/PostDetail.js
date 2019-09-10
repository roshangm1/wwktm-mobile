import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import MainLayout from '../../layouts/MainLayout';
import PostItem from './PostItem';
import {
  upvoteFeed,
  addCommentToPost,
  getCommentsForPost,
} from '../../firebase/activity';
import Colors from '../../configs/colors';
import { FlatList } from 'react-native-gesture-handler';
import { TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommentItem from './CommentItem';

const PostDetail = ({ navigation }) => {
  const { post } = navigation.state.params;
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState('');
  const inputRef = useRef();

  const likePost = () => {
    upvoteFeed(post);
  };
  const onComment = () => {
    addCommentToPost(post.id, comment);
    inputRef.current.clear();
  };

  const updateComments = response => {
    setComments(response);
  };

  const handleInputChange = text => {
    setComment(text);
  };

  const renderComment = ({ item }) => {
    return <CommentItem comment={item} />;
  };
  const renderAllComments = () => {
    if (comments === null) {
      return <Text style={{ textAlign: 'center' }}>Loading...</Text>;
    }
    if (comments.length <= 0) {
      return <Text style={{ textAlign: 'center' }}>No comments</Text>;
    }
    return (
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={item => item.id}
      />
    );
  };

  useEffect(() => {
    getCommentsForPost(post.id, updateComments);
  }, [post.id]);
  return (
    <MainLayout title="Details" icon="arrow-left">
      <ScrollView>
        <PostItem post={post} />
        <View style={styles.commentsContainer}>
          <Text style={styles.commentsTitle}>Comments</Text>
          {renderAllComments()}
        </View>
      </ScrollView>
      <KeyboardAvoidingView behavior="padding">
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 8,
            borderColor: Colors.grey,
            borderWidth: 1,
            borderRadius: 6,
            padding: 8,
            marginHorizontal: 16,
          }}
        >
          <TextInput
            ref={inputRef}
            placeholder="What's on your mind?"
            style={{ flex: 1 }}
            value={comment}
            onChangeText={handleInputChange}
          />
          <TouchableRipple
            style={{
              paddingHorizontal: 15,
              justifyContent: 'center',
            }}
            onPress={onComment}
          >
            <Icon name="send" size={20} color={Colors.black} />
          </TouchableRipple>
        </View>
      </KeyboardAvoidingView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  commentsContainer: {
    paddingHorizontal: 16,
  },
  commentsTitle: {
    color: Colors.lightBlack,
  },
});
export default PostDetail;
