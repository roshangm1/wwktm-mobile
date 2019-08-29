import React from 'react';
import { Text, View } from 'react-native';

import { logout } from '../../firebase/auth';
import MainLayout from '../../layouts/MainLayout';

const Settings = ({ navigation }) => {
  const logoutUser = () => {
    logout();
    navigation.navigate('AuthStack');
  };
  return (
    <MainLayout title="Settings">
      <View>
        <Text onPress={logoutUser}>Logout</Text>
      </View>
    </MainLayout>
  );
};
export default Settings;
