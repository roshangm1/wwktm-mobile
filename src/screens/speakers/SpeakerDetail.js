import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import MainLayout from '../../layouts/MainLayout';

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
