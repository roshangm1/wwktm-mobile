import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { getAllSpeakers } from '../../firebase/speakers';
import MainLayout from '../../layouts/MainLayout';
import SpeakerItem from './SpeakerItem';

const Speakers = ({ navigation }) => {
  const [speakers, setSpeakers] = useState(null);
  useEffect(() => {
    getAllSpeakers().then(speakersList => setSpeakers(speakersList));
  }, []);

  const renderSpeaker = ({ item }) => (
    <SpeakerItem
      item={item}
      onPress={() => navigation.navigate('SpeakerDetail')}
    />
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
