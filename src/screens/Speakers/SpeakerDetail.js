import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import MainLayout from '../MainLayout';

export default class SpeakerDetail extends Component {
  render() {
    return (
      <MainLayout title="Details" menu="arrow-back">
        <Text> SpeakerDetail </Text>
      </MainLayout>
    );
  }
}

const styles = StyleSheet.create({});
