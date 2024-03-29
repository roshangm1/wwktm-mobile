import { FlatList, TextInput, StyleSheet } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { TouchableRipple } from 'react-native-paper';

import PostItem from './PostItem';
import MainLayout from '../../layouts/MainLayout';
import { getFeedData, upvoteFeed } from '../../firebase/activity';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../configs/colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Spinner from '../../components/Spinner';
import EmptyComponent from './../../components/EmptyComponent';
import firebase from 'react-native-firebase';

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

  useEffect(() => {
    handleNotification();
    notificationListener();
    notificationOpenedListener();
    return () => {
      notificationListener();
      notificationOpenedListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notificationListener = () => {
    return firebase.notifications().onNotification(async notification => {
      const channel = new firebase.notifications.Android.Channel(
        'rnc',
        'rnc',
        firebase.notifications.Android.Importance.Max,
      );
      firebase.notifications().android.createChannel(channel);
      const notif = new firebase.notifications.Notification()
        .setNotificationId('3')
        .setTitle(notification.title)
        .setBody(notification.body)
        .android.setChannelId('rnc');

      firebase.notifications().displayNotification(notif);
    });
  };

  const notificationOpenedListener = () => {
    return firebase.notifications().onNotificationOpened(notifOpen => {
      handleNotificationClick(notifOpen);
    });
  };

  const handlePermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
    } else {
      try {
        await firebase.messaging().requestPermission();
      } catch (error) {}
    }
  };

  const handleNotification = () => {
    handlePermission();
  };

  const handleNotificationClick = async notifOpen => {
    if (notifOpen) {
      const { notification } = notifOpen;
    }
  };

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
      <MainLayout title="Activity Stream">
        <Spinner />
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Activity Stream">
      <FlatList
        data={feed}
        style={{ flex: 1 }}
        renderItem={renderItem}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<EmptyComponent />}
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
