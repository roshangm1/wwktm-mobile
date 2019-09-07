import React, { useState, useEffect } from 'react';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { Dimensions, View, ScrollView } from 'react-native';

import MainLayout from '../../layouts/MainLayout';
import { getDaySchedule } from '../../utils/array';
import { getProgramSchedule, likeASession } from '../../firebase/schedule';
import ScheduleItem from './ScheduleItem';

export const DayZeroRoute = ({ data, navigation }) => {
  const navigateToAddNote = id => {
    navigation.navigate('AddNote', { talkId: id });
  };
  const favouriteSession = session => {
    likeASession(session);
  };

  return (
    <ScrollView>
      {data.map((sche, index) => (
        <ScheduleItem
          key={sche.id}
          session={sche}
          navigation={navigation}
          // onAddNotePress={() => navigateToAddNote(sche.id)}
          onLikeSessionPress={() => favouriteSession(sche)}
        />
      ))}
    </ScrollView>
  );
};

const DayTwoRoute = () => <View style={{ backgroundColor: '#673ac4' }} />;

const Schedule = ({ navigation }) => {
  const [navigationState, setNavigationState] = useState({
    index: 0,
    routes: [
      { key: 'day0', title: 'Day 0' },
      { key: 'day1', title: 'Day 1' },
      { key: 'day2', title: 'Day 2' },
    ],
  });
  const [dayZero, setDayZero] = useState([]);
  const [dayOne, setDayOne] = useState([]);

  useEffect(() => {
    getProgramSchedule(scheduleData => {
      const day0 = getDaySchedule(scheduleData, '2019/09/20');
      const day1 = getDaySchedule(scheduleData, '2019/09/21');
      setDayZero(day0);
      setDayOne(day1);
    });
  }, []);

  const renderTabBar = tabBarProps => {
    return (
      <TabBar
        {...tabBarProps}
        inactiveColor="black"
        activeColor="tomato"
        indicatorStyle={{ backgroundColor: 'tomato' }}
        style={{ backgroundColor: '#ffffff', color: 'tomato' }}
      />
    );
  };
  return (
    <MainLayout title="Schedule">
      <TabView
        navigationState={navigationState}
        renderScene={SceneMap({
          day0: () => <DayZeroRoute data={dayZero} navigation={navigation} />,
          day1: () => <DayZeroRoute data={dayOne} navigation={navigation} />,
          day2: DayTwoRoute,
        })}
        renderTabBar={renderTabBar}
        onIndexChange={index =>
          setNavigationState({ ...navigationState, index })
        }
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    </MainLayout>
  );
};

export default Schedule;
