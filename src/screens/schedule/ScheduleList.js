import React from 'react';
import { ScrollView } from 'react-native';
import Spinner from '../../components/Spinner';
import { likeASession } from '../../firebase/schedule';
import ScheduleItem from './ScheduleItem';
import EmptyComponent from '../../components/EmptyComponent';

const SchdeuleList = ({ data, navigation }) => {
  const favouriteSession = session => {
    likeASession(session);
  };
  if (!data) {
    return <Spinner />;
  }

  if (data.length === 0) {
    return <EmptyComponent />;
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
