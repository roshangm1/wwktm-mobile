import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../configs/colors';

const EmptyComponent = () => {
  return (
    <View style={styles.mainContainer}>
      <Icon name="emoticon-neutral-outline" size={120} color={Colors.grey} />
      <Text style={styles.errorMsgText}>
        Seems like, there is nothing much here!
      </Text>
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
  errorMsgText: {
    paddingTop: 8,
    fontSize: 16,
  },
});

export default EmptyComponent;
