import React, { useState, useEffect } from 'react';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { Dimensions, View } from 'react-native';

import MainLayout from '../../layouts/MainLayout';
import { getDaySchedule } from '../../utils/array';
import { getProgramSchedule } from '../../firebase/schedule';

import SchdeuleList from './ScheduleList';
import Colors from '../../configs/colors';

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
  const [dayZero, setDayZero] = useState(null);
  const [dayOne, setDayOne] = useState(null);

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
        inactiveColor={Colors.black}
        activeColor={Colors.secondary}
        indicatorStyle={{ backgroundColor: Colors.secondary }}
        style={{ backgroundColor: Colors.white, color: Colors.secondary }}
      />
    );
  };
  return (
    <MainLayout title="Schedule">
      <TabView
        navigationState={navigationState}
        renderScene={SceneMap({
          day0: () => <SchdeuleList data={dayZero} navigation={navigation} />,
          day1: () => <SchdeuleList data={dayOne} navigation={navigation} />,
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
