import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Avatar,
  List,
  Title,
  Caption,
  Text,
  Paragraph,
} from 'react-native-paper';
import MainLayout from '../../layouts/MainLayout';
import { getTalkDetail } from '../../firebase/schedule';
import { getTalkDateRange } from './../../utils/date';
import SectionHeader from './../../components/SectionHeader';

const SpeakerDetail = ({ navigation }) => {
  const [scheduleInfo, setScheduleInfo] = useState({});
  const { talkId } = navigation.state.params.speakerDetail;
  useEffect(() => {
    getTalkDetail(talkId).then(response => {
      setScheduleInfo(response);
    });
  }, [navigation.state.params.speakerDetail.talkId, talkId]);
  const { startTime, endTime } = scheduleInfo;
  const {
    profilePicture,
    name,
    designation,
    organization,
    description,
    talk,
  } = navigation.state.params.speakerDetail;

  return (
    <MainLayout title="Details" icon="arrow-left">
      <ScrollView contentContaierStyle={{ flexGrow: 1 }}>
        <View style={{ alignItems: 'center', paddingVertical: 16 }}>
          <Avatar.Image
            source={{
              uri: profilePicture,
            }}
          />
          <Title>{name}</Title>
          <Caption style={styles.speakerLabelText}>{designation}</Caption>
          <Caption style={styles.speakerLabelText}>{organization}</Caption>
        </View>
        <SectionHeader title="DESCRIPTION" />
        <Paragraph style={styles.paragraphStyle}>{description}</Paragraph>
        <SectionHeader title="SCHEDULE" />
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
};

const styles = StyleSheet.create({
  nameText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    color: 'gray',
  },

  cardStyle: {
    backgroundColor: '#D6D6D6',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 4,
    padding: 15,
  },
  speakerLabelText: {
    fontSize: 14,
  },
  paragraphStyle: {
    paddingHorizontal: 16,
    textAlign: 'justify',
  },
  timeText: {
    marginTop: 7,
    fontWeight: 'bold',
  },
});

export default SpeakerDetail;
