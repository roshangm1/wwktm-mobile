import {
  Button,
  Avatar,
  Caption,
  Paragraph,
  Subheading,
  ActivityIndicator,
  FAB,
  Title,
} from 'react-native-paper';
import Row from './../../components/Row';
import Colors from './../../configs/colors';
import MainLayout from '../../layouts/MainLayout';
import React, { useEffect, useState } from 'react';
import { getSpeaker } from '../../firebase/speakers';
import { getMyNotesFor } from '../../firebase/notes';
import { getTalkDateRange } from './../../utils/date';
import { getNameInitials } from './../../utils/string';
import { View, StyleSheet, ScrollView } from 'react-native';
import SectionHeader from './../../components/SectionHeader';

const ScheduleDetail = ({ navigation }) => {
  const [speakerDetail, setSpeakerDetail] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const {
    title,
    startTime,
    endTime,
    longDescription,
    speakerId,
    id,
  } = navigation.state.params.schedule;

  useEffect(() => {
    if (speakerId) {
      getSpeaker(speakerId).then(response => setSpeakerDetail(response));
    }
  }, [speakerId]);

  useEffect(() => {
    getMyNotesFor(id, response => setNotes(response));
  }, [id]);

  const navigateToAddNote = sessionId => {
    navigation.navigate('AddNote', { talkId: sessionId, title });
  };

  const renderSpeakerSection = () => {
    if (!speakerDetail) {
      return (
        <View>
          <ActivityIndicator size={30} />
        </View>
      );
    }
    const { profilePicture, name, designation, organization } = speakerDetail;
    return (
      <View>
        <SectionHeader style={styles.sectionHeaderStyle} title="SPEAKERS" />
        <Row style={{ marginHorizontal: 16 }}>
          {profilePicture ? (
            <Avatar.Image
              style={styles.avatarStyle}
              source={{
                uri: profilePicture,
              }}
              size={80}
            />
          ) : (
            <Avatar.Text
              size={80}
              color={Colors.white}
              label={getNameInitials(name)}
              style={styles.avatarStyle}
            />
          )}
          <View style={{ flex: 1 }}>
            <Title>{name}</Title>
            <Caption
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.speakerLabelText}
            >
              {designation}
            </Caption>
            <Caption style={styles.speakerLabelText}>{organization}</Caption>
          </View>
        </Row>
      </View>
    );
  };
  return (
    <MainLayout title="Schedule Details" icon="arrow-left">
      <ScrollView contentContianerStyle={styles.rootContainer}>
        <View style={styles.titleContainer}>
          <Title>{title}</Title>
          <Subheading style={styles.dateText}>
            {getTalkDateRange(startTime, endTime)}
          </Subheading>
          <Button
            mode="outlined"
            onPress={() =>
              navigation.navigate('ScheduleNotes', { talkId: id, title })
            }
            style={{ marginVertical: 10 }}
          >
            {`My Notes (${notes.length})`}
          </Button>
        </View>
        <SectionHeader style={styles.sectionHeaderStyle} title="DESCRIPTION" />
        <Paragraph style={styles.descriptionText}>{longDescription}</Paragraph>
        {renderSpeakerSection()}
      </ScrollView>
      <FAB.Group
        open={isOpen}
        icon={isOpen ? 'close' : 'plus'}
        color={Colors.white}
        actions={[
          {
            icon: 'pencil',
            color: Colors.secondary,
            label: 'Add Note',
            onPress: () => navigateToAddNote(id),
          },
          {
            icon: 'comment-question',
            color: Colors.secondary,
            label: 'Add a question',
            onPress: () => navigation.navigate('AddQuestion', { talkId: id }),
          },
        ]}
        onStateChange={({ open }) => setIsOpen(open)}
        fabStyle={{ backgroundColor: Colors.secondary }}
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flexGrow: 1,
  },
  titleContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  speakerLabelText: {
    fontSize: 14,
  },
  dateText: {
    color: '#919191',
  },
  sectionHeaderStyle: {
    marginVertical: 16,
  },
  descriptionText: {
    marginHorizontal: 16,
    textAlign: 'justify',
  },
  avatarStyle: {
    marginRight: 16,
  },
  starsIcon: {
    padding: 0,
    margin: 0,
  },
});

export default ScheduleDetail;
