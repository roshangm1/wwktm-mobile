import React, { Component } from './node_modules/react';
import { Text, StyleSheet } from 'react-native';
import MainLayout from '../MainLayout';

export default class SpeakerDetail extends Component {
  render() {
    return (
      <MainLayout title="Details" icon="arrow-back">
        <Text> SpeakerDetail </Text>
      </MainLayout>
    );
  }
}

const styles = StyleSheet.create({});
