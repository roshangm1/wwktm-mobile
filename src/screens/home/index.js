import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MainLayout from '../MainLayout';

const Home = ({ navigation }) => {
  return (
    <MainLayout title="Home">
      <View style={styles.mainContainer}>
        <Text> Welcome to Web Weekend Kathmandu mobile app</Text>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
