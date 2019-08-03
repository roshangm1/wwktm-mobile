import React from 'react';
import { Text, View } from 'react-native';
import MainLayout from '../MainLayout';
import { loginAnon } from '../../firebase/auth';

const Home = ({ params }) => {
  return (
    <MainLayout title="Home">
      <View>
        <Text onPress={loginAnon}>Home</Text>
      </View>
    </MainLayout>
  );
};
export default Home;
