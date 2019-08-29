import React from 'react';
import { Text, View } from 'react-native';

import { logout } from '../../firebase/auth';
import MainLayout from '../../layouts/MainLayout';

const Home = ({ navigation }) => {
  const logoutUser = () => {
    logout();
    navigation.navigate('AuthStack');
  };
  return (
    <MainLayout title="Home">
      <View>
        <Text onPress={logoutUser}>Logout</Text>
      </View>
    </MainLayout>
  );
};
export default Home;
