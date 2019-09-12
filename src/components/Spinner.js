import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Colors from '../configs/colors';

const Spinner = ({ params }) => (
  <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
    }}
  >
    <ActivityIndicator size={40} color={Colors.secondary} />
  </View>
);

export default Spinner;
