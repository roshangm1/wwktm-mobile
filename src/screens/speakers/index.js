import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import SpeakerItem from './SpeakerItem';
import MainLayout from '../../layouts/MainLayout';
import { getAllSpeakers } from '../../firebase/speakers';
import Spinner from '../../components/Spinner';

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
  if (!speakers) {
    return (
      <MainLayout title="Speakers">
        <Spinner />
      </MainLayout>
    );
  }
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
