import {
  Title,
  Avatar,
  Divider,
  Caption,
  Paragraph,
  Subheading,
  IconButton,
  FAB,
  Portal,
  Button,
} from 'react-native-paper';
import Row from './../../components/Row';
import Colors from './../../configs/colors';
import MainLayout from '../../layouts/MainLayout';
import React, { useEffect, useState } from 'react';
import { getSpeaker } from '../../firebase/speakers';
import { getTalkDateRange } from './../../utils/date';
import { View, StyleSheet, ScrollView } from 'react-native';
import SectionHeader from './../../components/SectionHeader';

const ScheduleDetail = ({ navigation }) => {
  const [speakerDetail, setSpeakerDetail] = useState({});
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

  const navigateToAddNote = sessionId => {
    navigation.navigate('AddNote', { talkId: sessionId, title });
  };

  const { profilePicture, name, designation, organization } = speakerDetail;
  return (
    <MainLayout title="Session Details" icon="arrow-left">
      <ScrollView contentContianerStyle={styles.rootContainer}>
        <View style={styles.titleContainer}>
          <Title>{title}</Title>
          <Subheading style={styles.dateText}>
            {getTalkDateRange(startTime, endTime)}
          </Subheading>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('ScheduleNotes', { talkId: id })}
            style={{ marginVertical: 10 }}
          >
            My Notes
          </Button>
          <Divider style={styles.sectionHeaderStyle} />
          <Row>
            <IconButton
              color={Colors.primary}
              icon={'star'}
              style={styles.starsIcon}
            />
            <IconButton
              color={Colors.primary}
              icon={'star'}
              style={styles.starsIcon}
            />
            <IconButton
              color={Colors.primary}
              icon={'star'}
              style={styles.starsIcon}
            />
            <IconButton
              color={Colors.primary}
              icon={'star'}
              style={styles.starsIcon}
            />
            <IconButton
              color={Colors.primary}
              icon={'star'}
              style={styles.starsIcon}
            />

            {/* <Caption style={{ fontSize: 14 }}>No ratings</Caption> */}
          </Row>
        </View>
        <SectionHeader style={styles.sectionHeaderStyle} title="DESCRIPTION" />
        <Paragraph style={styles.descriptionText}>{longDescription}</Paragraph>
        {speakerId !== '' && (
          <View>
            <SectionHeader style={styles.sectionHeaderStyle} title="SPEAKERS" />
            <Row style={{ marginHorizontal: 16 }}>
              <Avatar.Image
                style={styles.avatarStyle}
                source={{
                  uri: profilePicture,
                }}
                size={80}
              />
              <View style={{ flex: 1 }}>
                <Title>{name}</Title>
                <Caption
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.speakerLabelText}
                >
                  {designation}
                </Caption>
                <Caption style={styles.speakerLabelText}>
                  {organization}
                </Caption>
              </View>
            </Row>
          </View>
        )}

        <Portal>
          <FAB.Group
            open={isOpen}
            icon={isOpen ? 'close' : 'plus'}
            color={Colors.white}
            actions={[
              {
                icon: 'star-outline',
                color: Colors.primary,
                label: 'Add to Favourites',
                onPress: () => alert('Add to Favourites'),
              },
              {
                icon: 'pencil',
                color: Colors.primary,
                label: 'Add Note',
                onPress: () => navigateToAddNote(id),
              },
            ]}
            onStateChange={({ open }) => setIsOpen(open)}
            fabStyle={{ backgroundColor: Colors.primary }}
          />
        </Portal>
      </ScrollView>
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
