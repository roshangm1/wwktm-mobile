import React, { useState, useEffect } from 'react';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { Dimensions } from 'react-native';

import MainLayout from '../../layouts/MainLayout';
import { getDaySchedule } from '../../utils/array';
import { getProgramSchedule } from '../../firebase/schedule';

import SchdeuleList from './ScheduleList';
import Colors from '../../configs/colors';

const Schedule = ({ navigation }) => {
  const [navigationState, setNavigationState] = useState({
    index: 0,
    routes: [
      { key: 'day1', title: 'Sep 21' },
      { key: 'day2', title: 'Sep 22' },
    ],
  });
  const [dayOne, setDayOne] = useState(null);
  const [dayTwo, setDayTwo] = useState(null);

  useEffect(() => {
    getProgramSchedule(scheduleData => {
      const day1 = getDaySchedule(scheduleData, '2019/09/21');
      const day2 = getDaySchedule(scheduleData, '2019/09/22');

      setDayOne(day1);
      setDayTwo(day2);
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
          day1: () => <SchdeuleList data={dayOne} navigation={navigation} />,
          day2: () => <SchdeuleList data={dayTwo} navigation={navigation} />,
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
