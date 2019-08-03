import React from 'react';
import { View, StyleSheet } from 'react-native';

const Row = ({ children }) => <View style={styles.container}>{children}</View>;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Row;
