import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Row from './Row';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ActionButton = ({ iconName, title, onPress, style }) => {
  return (
    <TouchableRipple style={[styles.touchableStyle, style]} onPress={onPress}>
      <Row>
        <Icon name={iconName} size={20} color="#6B6767" />
        <Text style={styles.titleText}>{title}</Text>
      </Row>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  touchableStyle: {
    marginRight: 15,
  },
  titleText: {
    paddingLeft: 5,
    fontSize: 16,
    color: '#6B6767',
    fontWeight: 'bold',
  },
});

export default ActionButton;
