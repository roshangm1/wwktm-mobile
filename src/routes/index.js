import React from 'react';
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import DrawerContent from './DrawerContent';
import * as screens from '../screens';
import AuthLoading from '../screens/AuthLoadingScreen';

const SpeakerNavigator = createStackNavigator(
  {
    Speakers: {
      screen: screens.Speakers,
    },
    SpeakerDetail: {
      screen: screens.SpeakerDetail,
    },
  },
  { headerMode: 'none' },
);

const ScheduleNavigator = createStackNavigator(
  {
    Schedule: {
      screen: screens.Schedule,
    },
    ScheduleDetail: {
      screen: screens.ScheduleDetail,
    },
    AddNote: {
      screen: screens.AddNote,
    },
    MyQuestions: {
      screen: screens.MyQuestions,
    },
    AddQuestion: {
      screen: screens.AddQuestion,
    },
  },
  { headerMode: 'none' },
);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: screens.Login,
    },
    Register: {
      screen: screens.Register,
    },
  },
  { headerMode: 'none' },
);

const AppStack = createDrawerNavigator(
  {
    Activity: {
      screen: screens.Activity,
    },
    Speakers: {
      screen: SpeakerNavigator,
    },
    Schedule: {
      screen: ScheduleNavigator,
    },

    Questions: {
      screen: screens.Questions,
    },
    Settings: {
      screen: screens.Settings,
    },
  },
  {
    drawerWidth: 300,
    contentComponent: props => {
      return <DrawerContent {...props} />;
    },
  },
);

export const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      AuthStack: AuthStack,
      AppStack: AppStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
  createStackNavigator(
    {
      AuthStack: AuthStack,
      AppStack: AppStack,
    },
    {
      headerMode: 'none',
      initialRouteName: 'AuthStack',
    },
  ),
);
