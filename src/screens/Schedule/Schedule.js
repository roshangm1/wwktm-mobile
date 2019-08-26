import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, Text } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import MainLayout from '../MainLayout';
import { Card, TouchableRipple } from 'react-native-paper';
import { getProgramSchedule, addNoteForTalk } from '../../firebase/schedule';

const DayZeroRoute = ({ data = { schedule: [] }, navigation }) => {
  return (
    <ScrollView>
      {data.schedule.map((sche, index) => (
        <TouchableRipple
          key={index.toString()}
          onPress={() =>
            navigation.navigate('ScheduleDetail', { talkId: sche.talkId })
          }
          style={{ padding: 4 }}
        >
          <Card>
            <Card.Content
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={{ flex: 4 }}>
                <Text style={{ fontWeight: 'bold' }}>{sche.session}</Text>
                <Text>{sche.time}</Text>
              </View>
              {sche.talkId ? (
                <Text
                  style={{ flex: 1 }}
                  onPress={() =>
                    addNoteForTalk(
                      sche.talkId,
                      `Some speacial note ${Math.random()}`,
                    )
                  }
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
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    getProgramSchedule().then(scheduleData => {
      setSchedule(scheduleData);
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
          day0: () => (
            <DayZeroRoute data={schedule[0]} navigation={navigation} />
          ),
          day1: () => (
            <DayZeroRoute data={schedule[1]} navigation={navigation} />
          ),
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
