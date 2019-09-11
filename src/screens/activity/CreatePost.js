import React, { useState } from 'react';
import { View, TextInput, Image, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toolbar from './../../components/Toolbar';
import Container from './../../components/Container';
import { TouchableRipple } from 'react-native-paper';
import { addNewPost } from '../../firebase/activity';
import ImagePicker from 'react-native-image-picker';
import Colors from '../../configs/colors';

const CreatePost = ({ navigation }) => {
  const textInputRef = React.useRef();
  const [postDetail, setPostDetail] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTextChange = text => {
    setPostDetail(text);
  };

  const options = {
    quality: 0.5,
  };
  function openPicker() {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('Error', 'User cancelled image picker');
      } else if (response.error) {
        console.log('Error', 'ImagePicker Error: ' + response.error);
      } else {
        const source = { uri: response.uri };
        setImagePath(source.uri);
      }
    });
  }

  const addPost = () => {
    if (postDetail !== '' || imagePath !== '') {
      setLoading(true);
      addNewPost(postDetail, imagePath)
        .then(() => {
          setImagePath('');
          navigation.navigate('Activity');
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      Alert.alert('Alert', 'Post should not be empty.');
    }
  };

  return (
    <Container>
      <Toolbar
        title="Create Post"
        icon="arrow-left"
        actions={
          loading ? (
            <ActivityIndicator
              size={20}
              style={{ paddingHorizontal: 10 }}
              color={Colors.white}
            />
          ) : (
            <TouchableRipple
              style={{ paddingHorizontal: 10 }}
              onPress={addPost}
            >
              <Icon name="check-bold" color={Colors.white} size={20} />
            </TouchableRipple>
          )
        }
      />
      <View style={{ padding: 16 }}>
        <TextInput
          ref={textInputRef}
          placeholder="What's on your mind?"
          autoFocus
          onChangeText={handleTextChange}
          style={{
            backgroundColor: 'white',
            marginBottom: 30,
            fontSize: 15,
          }}
          multiline
          numberOfLines={5}
        />
        <TouchableRipple
          onPress={openPicker}
          style={{
            backgroundColor: '#E6E6E6',
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name="camera" size={20} color="black" />
        </TouchableRipple>
        {imagePath ? (
          <Image
            source={{ uri: imagePath }}
            style={{ height: 80, width: 80, marginTop: 10 }}
          />
        ) : null}
      </View>
    </Container>
  );
};

export default CreatePost;
