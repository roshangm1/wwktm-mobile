import React from 'react';
import { ScrollView } from 'react-native';
import Spinner from '../../components/Spinner';
import { likeASession } from '../../firebase/schedule';
import ScheduleItem from './ScheduleItem';

const SchdeuleList = ({ data, navigation }) => {
  const favouriteSession = session => {
    likeASession(session);
  };
  if (!data) {
    return <Spinner />;
  }
  return (
    <ScrollView>
      {data.map((sche, index) => (
        <ScheduleItem
          key={sche.id}
          session={sche}
          navigation={navigation}
          onLikeSessionPress={() => favouriteSession(sche)}
        />
      ))}
    </ScrollView>
  );
};

export default SchdeuleList;
