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
import { getTalkDetail } from '../../firebase/schedule';
import { getTalkDateRange } from './../../utils/date';

export default class SpeakerDetail extends Component {
  state = {
    scheduleInfo: {},
  };
  componentDidMount() {
    getTalkDetail(this.props.navigation.state.params.speakerDetail.talkId).then(
      response => {
        this.setState({ scheduleInfo: response });
      },
    );
  }

  render() {
    const {
      profilePicture,
      name,
      designation,
      organization,
      description,
      talk,
    } = this.props.navigation.state.params.speakerDetail;
    const { startTime, endTime } = this.state.scheduleInfo;
    console.log(startTime, endTime);
    return (
      <MainLayout title="Details" icon="arrow-left">
        <ScrollView contentContaierStyle={{ flexGrow: 1 }}>
          <View style={{ alignItems: 'center', paddingVertical: 15 }}>
            <Avatar.Image
              source={{
                uri: profilePicture,
              }}
            />
            <Title>{name}</Title>
            <Caption style={styles.speakerLabelText}>{designation}</Caption>
            <Caption style={styles.speakerLabelText}>{organization}</Caption>
          </View>
          <Subheading style={styles.sectionHeader}>DESCRIPTION</Subheading>
          <Paragraph style={styles.paragraphStyle}>{description}</Paragraph>
          <Subheading style={styles.sectionHeader}>SCHEDULE</Subheading>
          <List.Subheader>September 21</List.Subheader>
          <View style={styles.cardStyle}>
            <Paragraph>{talk}</Paragraph>
            <Text style={styles.timeText}>
              {startTime && getTalkDateRange(startTime, endTime)}
            </Text>
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
    marginBottom: 8,
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
