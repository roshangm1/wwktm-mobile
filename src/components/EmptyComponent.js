import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EmptyComponent = () => {
  return (
    <View style={styles.mainContainer}>
      <Icon name="bandage" size={24} color="black" />
      <Text style={styles.text}> Wow! such empty</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    paddingTop: 15,
    fontSize: 15,
  },
});

export default EmptyComponent;
