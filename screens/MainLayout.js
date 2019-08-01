import React from 'react';
import { SafeAreaView } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import Toolbar from '../components/Toolbar';
import Container from '../components/Container';
import { useNavigation } from 'react-navigation-hooks';

const MainLayout = ({ title, children }) => {
  return (
    <>
      <Toolbar title={title} icon="menu" />
      {children}
    </>
  );
};
export default MainLayout;
