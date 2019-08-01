import React from 'react';
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
} from 'react-navigation';
import DrawerContent from './DrawerContent';
import * as screens from '../screens';

const SpeakerNavigator = createStackNavigator(
  {
    Speakers: {
      screen: screens.Speakers,
    },
  },
  { headerMode: 'none' },
);
const DrawerStack = createDrawerNavigator(
  {
    Home: {
      screen: screens.Home,
    },
    Speakers: {
      screen: SpeakerNavigator,
    },
  },
  {
    drawerWidth: 300,
    contentComponent: props => {
      return <DrawerContent {...props} />;
    },
  },
);

export const AppContainer = createAppContainer(DrawerStack);
