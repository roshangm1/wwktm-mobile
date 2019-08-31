import { FlatList, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';

import PostItem from './PostItem';
import MainLayout from '../../layouts/MainLayout';
import { getFeedData, addNewPost } from '../../firebase/activity';

const Activity = ({ params }) => {
  const [feed, setFeed] = useState([]);
  const [imagePath, setImagePath] = useState('');
  const [newFeedData, setNewFeedData] = useState('');
  const textInputRef = React.useRef();

  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  function openPicker() {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        Alert.alert('Error', 'User cancelled image picker');
      } else if (response.error) {
        Alert.alert('Error', 'ImagePicker Error: ' + response.error);
      } else if (response.customButton) {
        Alert.alert(
          'Error',
          'User tapped custom button: ' + response.customButton,
        );
      } else {
        const source = { uri: response.uri };
        setImagePath(source.uri);
      }
    });
  }

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
    addNewPost(newFeedData, imagePath);
    setImagePath('');
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
        <Button icon="camera" onPress={openPicker} />
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
