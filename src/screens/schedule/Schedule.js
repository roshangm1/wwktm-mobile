import React, { useState, useEffect } from 'react';
import { Card, TouchableRipple } from 'react-native-paper';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { Dimensions, StyleSheet, View, ScrollView, Text } from 'react-native';

import MainLayout from '../../layouts/MainLayout';
import { getDaySchedule } from '../../utils/array';
import { getTalkDateRange } from '../../utils/date';
import { getProgramSchedule } from '../../firebase/schedule';

const DayZeroRoute = ({ data, navigation }) => {
  const navigateToAddNote = id => {
    navigation.navigate('AddNote', { talkId: id });
  };
  return (
    <ScrollView>
      {data.map((sche, index) => (
        <TouchableRipple
          key={index.toString()}
          onPress={() =>
            navigation.navigate('ScheduleDetail', { schedule: sche })
          }
          style={{ padding: 4 }}
        >
          <Card>
            <Card.Content
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={{ flex: 4 }}>
                <Text style={{ fontWeight: 'bold' }}>{sche.title}</Text>
                <Text>{getTalkDateRange(sche.startTime, sche.endTime)}</Text>
              </View>
              {sche.type === 'session' ? (
                <Text
                  style={{ flex: 1 }}
                  onPress={() => navigateToAddNote(sche.id)}
                >
                  Add note
                </Text>
              ) : null}
            </Card.Content>
          </Card>
        </TouchableRipple>
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
    getProgramSchedule().then(scheduleData => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
