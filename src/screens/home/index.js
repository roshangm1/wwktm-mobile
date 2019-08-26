import React from './node_modules/react';
import { Text, View } from 'react-native';
import { logout } from '../../firebase/auth';
import MainLayout from '../MainLayout';

const Home = ({ params }) => {
  return (
    <MainLayout title="Home">
      <View>
        <Text onPress={logout}>Logout</Text>
      </View>
    </MainLayout>
  );
};
export default Home;
