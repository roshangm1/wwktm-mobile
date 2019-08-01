import React from 'react';
import { SafeAreaView } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

const Home = ({ params }) => (
  <SafeAreaView>
    <Appbar.Header>
      <Appbar.BackAction onPress={this._goBack} />
      <Appbar.Content title="Title" />
    </Appbar.Header>
  </SafeAreaView>
);

export default Home;
