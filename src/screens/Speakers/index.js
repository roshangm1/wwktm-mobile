import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import MainLayout from '../MainLayout';
import { getAllSpeakers } from '../../firebase/speakers';
import { FlatList } from 'react-native-gesture-handler';
import { Card, Avatar, TouchableRipple } from 'react-native-paper';
import Row from '../../components/Row';

const Speakers = ({ navigation }) => {
  const [speakers, setSpeakers] = useState(null);
  useEffect(() => {
    getAllSpeakers().then(speakersList => setSpeakers(speakersList));
  }, []);

  const renderSpeaker = ({ item }) => (
    <TouchableRipple onPress={() => navigation.navigate('SpeakerDetail')}>
      <Card elevation={2}>
        <Card.Content>
          <Row>
            <Avatar.Image size={40} source={{ uri: item.name }} />
            <View style={{ marginLeft: 16 }}>
              <Text>{item.name}</Text>
              <Text>{item.country}</Text>
            </View>
          </Row>
        </Card.Content>
      </Card>
    </TouchableRipple>
  );
  return (
    <MainLayout title="Speakers">
      <FlatList
        data={speakers}
        renderItem={renderSpeaker}
        keyExtractor={item => item.id}
      />
    </MainLayout>
  );
};

export default Speakers;
