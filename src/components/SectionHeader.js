import React from 'react';
import { StyleSheet } from 'react-native';
import { Subheading } from 'react-native-paper';

const SectionHeader = ({ title, style }) => {
  return <Subheading style={[styles.headerText, style]}>{title}</Subheading>;
};

const styles = StyleSheet.create({
  headerText: {
    backgroundColor: '#ECECEC',
    paddingVertical: 5,
    color: '#555353',
    paddingHorizontal: 15,
    marginTop: 10,
  },
});

export default SectionHeader;
