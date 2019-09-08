import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import SpeakerItem from './SpeakerItem';
import MainLayout from '../../layouts/MainLayout';
import { getAllSpeakers } from '../../firebase/speakers';

const Speakers = ({ navigation }) => {
  const [speakers, setSpeakers] = useState(null);
  useEffect(() => {
    getAllSpeakers().then(speakersList => setSpeakers(speakersList));
  }, []);

  const renderSpeaker = ({ item }) => (
    <SpeakerItem
      item={item}
      onPress={() =>
        navigation.navigate('SpeakerDetail', { speakerDetail: item })
      }
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
