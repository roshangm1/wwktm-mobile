import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Avatar,
  List,
  Title,
  Subheading,
  Caption,
  Text,
  Paragraph,
} from 'react-native-paper';
import MainLayout from '../../layouts/MainLayout';

export default class SpeakerDetail extends Component {
  render() {
    return (
      <MainLayout title="Details" icon="arrow-left">
        <ScrollView contentContaierStyle={{ flexGrow: 1, paddingVertical: 15 }}>
          <View style={{ alignItems: 'center' }}>
            <Avatar.Image
              source={{
                uri:
                  'https://www.crockerriverside.org/sites/main/files/imagecache/carousel/main-images/camera_lense_0.jpeg',
              }}
            />
            <Title>Rashila Pandey</Title>
            <Caption style={styles.speakerLabelText}>Cofounder and CEO</Caption>
            <Caption style={styles.speakerLabelText}>Pandey Nibas</Caption>
          </View>
          <Subheading style={styles.sectionHeader}>DESCRIPTION</Subheading>
          <Paragraph style={styles.paragraphStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Paragraph>
          <Subheading style={styles.sectionHeader}>SCHEDULE</Subheading>
          <List.Subheader>June 29</List.Subheader>
          <View style={styles.cardStyle}>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Paragraph>
            <Text style={styles.timeText}>13:43 - 34:09</Text>
          </View>
        </ScrollView>
      </MainLayout>
    );
  }
}

const styles = StyleSheet.create({
  nameText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    color: 'gray',
  },
  sectionHeader: {
    backgroundColor: '#ECECEC',
    paddingVertical: 5,
    color: '#555353',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  cardStyle: {
    backgroundColor: '#D6D6D6',
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 4,
    padding: 15,
  },
  speakerLabelText: {
    fontSize: 14,
  },
  paragraphStyle: {
    paddingHorizontal: 15,
  },
  timeText: {
    marginTop: 7,
    fontWeight: 'bold',
  },
});
