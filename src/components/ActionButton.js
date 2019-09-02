import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Row from './Row';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../configs/colors';

const ActionButton = ({ iconName, title, onPress, color, style }) => {
  return (
    <TouchableRipple style={[styles.touchableStyle, style]} onPress={onPress}>
      <Row>
        <Icon name={iconName} size={16} color={color || Colors.lightBlack} />
        <Text style={[styles.titleText, { color: color || Colors.lightBlack }]}>
          {title}
        </Text>
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
    fontWeight: 'bold',
  },
});

export default ActionButton;
