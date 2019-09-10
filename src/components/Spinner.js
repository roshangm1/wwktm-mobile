import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ params }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator size={40} />
  </View>
);

export default Spinner;
